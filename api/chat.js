const { buildCompanyContext, buildSystemPrompt } = require("../server/lib/companyContext");

async function groqChatCompletion({ messages, model, temperature, max_tokens }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing GROQ_API_KEY");

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Groq API error ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Groq returned empty response");
  }
  return content.trim();
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

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

    const reply = await groqChatCompletion({
      messages: payloadMessages,
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 700,
    });

    res.status(200).json({
      ok: true,
      reply,
      used_context: companyContext?.used || [],
    });
  } catch (err) {
    console.error("[api/chat] error:", err);
    res.status(500).json({ ok: false, error: "Chat request failed" });
  }
};

