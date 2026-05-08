const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { groqChatCompletion } = require("./lib/groq");
const { buildCompanyContext, buildSystemPrompt } = require("./lib/companyContext");

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;

if (!process.env.GROQ_API_KEY) {
  // Don't crash in dev builds, but make it obvious what's wrong.
  console.warn(
    "[server] GROQ_API_KEY is missing. Create a .env file in the project root with GROQ_API_KEY=..."
  );
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body || {};

    const safeMessages = Array.isArray(messages) ? messages : [];
    const lastUser =
      typeof userMessage === "string" && userMessage.trim()
        ? userMessage.trim()
        : safeMessages
            .slice()
            .reverse()
            .find((m) => m && m.role === "user" && typeof m.content === "string")?.content || "";

    const companyContext = buildCompanyContext(lastUser);
    const systemPrompt = buildSystemPrompt(companyContext);

    const payloadMessages = [
      { role: "system", content: systemPrompt },
      ...safeMessages
        .filter((m) => m && typeof m.role === "string" && typeof m.content === "string")
        .slice(-20),
    ];

    const completion = await groqChatCompletion({
      messages: payloadMessages,
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 700,
    });

    res.json({
      ok: true,
      reply: completion,
      used_context: companyContext?.used || [],
    });
  } catch (err) {
    console.error("[server] /api/chat error:", err);
    res.status(500).json({
      ok: false,
      error: "Chat request failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

