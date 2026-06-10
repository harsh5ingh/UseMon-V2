import type { ProductivityCategory } from "../types.js";

const rules: Array<{ pattern: RegExp; category: ProductivityCategory; score: number }> = [
  { pattern: /code|xcode|terminal|iterm|github|figma|linear|jira/i, category: "CODING", score: 92 },
  { pattern: /notion|obsidian|word|docs|pages|excel|sheets|research/i, category: "STUDY", score: 82 },
  { pattern: /slack|teams|outlook|mail|calendar/i, category: "WORK", score: 72 },
  { pattern: /youtube|netflix|spotify|twitch|vlc|music/i, category: "ENTERTAINMENT", score: 24 },
  { pattern: /discord|instagram|x\.com|twitter|reddit|whatsapp/i, category: "SOCIAL", score: 30 },
  { pattern: /amazon|flipkart|shop|cart|store/i, category: "SHOPPING", score: 18 }
];

export function classifyActivity(appName: string, windowTitle = "", browserUrl = "") {
  const haystack = `${appName} ${windowTitle} ${browserUrl}`;
  const match = rules.find((rule) => rule.pattern.test(haystack));
  return match ?? { category: "OTHER" as ProductivityCategory, score: 50 };
}
