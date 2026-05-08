const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const SRC_ROOT = path.join(REPO_ROOT, "src");

function safeReadFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (_e) {
    return "";
  }
}

function extractFaqPairsFromSource() {
  const faqPath = path.join(SRC_ROOT, "components", "Webpages", "Faq.js");
  const src = safeReadFile(faqPath);
  if (!src) return [];

  const pairs = [];
  const re = /\{\s*q:\s*"([^"]+)"\s*,\s*a:\s*"([^"]+)"\s*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const q = m[1]?.trim();
    const a = m[2]?.trim();
    if (q && a) pairs.push({ q, a, source: "FAQ" });
  }
  return pairs;
}

function extractCompaniesFromServeSource() {
  const servePath = path.join(SRC_ROOT, "components", "Webpages", "Serve.js");
  const src = safeReadFile(servePath);
  if (!src) return [];

  const items = [];
  const re =
    /\{\s*name:\s*"([^"]+)"[\s\S]*?link:\s*"([^"]+)"[\s\S]*?desc:\s*"([^"]+)"\s*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const name = m[1]?.trim();
    const link = m[2]?.trim();
    const desc = m[3]?.trim();
    if (name && link && desc) items.push({ name, link, desc, source: "Serve" });
  }
  return items;
}

function normalize(s) {
  return String(s || "").toLowerCase();
}

function scoreText(text, query) {
  const t = normalize(text);
  const q = normalize(query);
  if (!q) return 0;

  const words = q
    .split(/[^a-z0-9]+/i)
    .map((w) => w.trim())
    .filter(Boolean)
    .slice(0, 12);

  let score = 0;
  for (const w of words) {
    if (w.length < 3) continue;
    if (t.includes(w)) score += 2;
  }
  if (t.includes(q)) score += 6;
  return score;
}

function buildCompanyContext(userQuestion) {
  const faqs = extractFaqPairsFromSource();
  const companies = extractCompaniesFromServeSource();

  const candidates = [];

  for (const f of faqs) {
    const s = scoreText(`${f.q} ${f.a}`, userQuestion);
    if (s > 0) candidates.push({ score: s, text: `Q: ${f.q}\nA: ${f.a}`, source: f.source });
  }

  for (const c of companies) {
    const s = scoreText(`${c.name} ${c.desc} ${c.link}`, userQuestion);
    if (s > 0)
      candidates.push({
        score: s,
        text: `Company: ${c.name}\nAbout: ${c.desc}\nWebsite: ${c.link}`,
        source: c.source,
      });
  }

  candidates.sort((a, b) => b.score - a.score);
  const top = candidates.slice(0, 5);

  const used = top.map((t) => t.source);
  const contextText = top.map((t) => t.text).join("\n\n");

  return { text: contextText, used };
}

function buildSystemPrompt(companyContext) {
  const ctx = companyContext?.text ? `\n\nCompany knowledge:\n${companyContext.text}\n` : "";

  return [
    "You are Poeage Technology's official AI assistant for the website chatbot.",
    "Answer user questions about Poeage Technology, its services, products, hiring, processes, policies, and contact guidance.",
    "",
    "Rules:",
    "- Be accurate and company-focused.",
    "- If the user asks something not related to Poeage Technology, answer briefly but try to relate it back to how Poeage can help.",
    "- If you are not sure about a specific fact (prices, addresses, legal details), say you are not sure and suggest contacting the team, instead of guessing.",
    "- Keep responses clear and helpful. Use short paragraphs and bullet points when useful.",
    ctx,
  ].join("\n");
}

module.exports = { buildCompanyContext, buildSystemPrompt };

