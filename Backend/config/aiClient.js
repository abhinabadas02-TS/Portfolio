// import Anthropic from "@anthropic-ai/sdk";

// let client = null;

// /**
//  * Lazily create the Anthropic client. Returns null if no API key
//  * is configured so the app can still boot without the chatbot.
//  */
// export const getAIClient = () => {
//   if (client) return client;

//   const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
//   if (!apiKey) return null;

//   client = new Anthropic({ apiKey });
//   return client;
// };

// // Model used for chat responses. Swap to a cheaper model if needed —
// // claude-haiku-4-5-20251001 is a good low-cost option for a portfolio bot.
// export const AI_MODEL = process.env.AI_MODEL || "claude-sonnet-5";

// export const verifyAIClient = () => {
//   const c = getAIClient();
//   if (!c) {
//     console.warn("⚠️  ANTHROPIC_API_KEY not set in .env — AI chatbot disabled.");
//     console.warn("   → Get a key at: https://console.anthropic.com/settings/keys");
//   } else {
//     console.log(`🤖 AI chatbot ready — model: ${AI_MODEL}`);
//   }
// };
































import Groq from "groq-sdk";

let client = null;

/**
 * Adapter Pattern: normalizes provider-specific SDK calls into
 * a single interface the controller depends on — satisfies DIP & OCP.
 */
export const getAIClient = () => {
  if (client) return client;

  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) return null;

  const groq = new Groq({ apiKey });

  client = {
    /**
     * Unified interface: mirrors the shape chatController expects
     * (system + messages in, { content } out) so callers never
     * know which vendor SDK sits underneath.
     */
    messages: {
      create: async ({ system, messages, max_tokens, temperature }) => {
        const completion = await groq.chat.completions.create({
          model: AI_MODEL,
          max_tokens,
          temperature,
          messages: [{ role: "system", content: system }, ...messages],
        });

        const text = completion.choices[0]?.message?.content ?? "";
        return { content: [{ type: "text", text }] };
      },
    },
  };

  return client;
};

// Free-tier Groq model — fast, no cost, no credit card required.
// Swap to "llama-3.1-8b-instant" for even faster/cheaper responses.
// export const AI_MODEL = process.env.AI_MODEL || "llama-3.3-70b-versatile";

export const AI_MODEL = process.env.AI_MODEL?.trim() || "openai/gpt-oss-120b";

// const SUPPORTED_MODELS = Object.freeze([
//   "llama-3.1-8b-instant",
//   "llama-3.3-70b-versatile", // kept for reference; remove once confirmed unsupported
//   "llama-3.1-70b-versatile",
  
// ]);

// const DEFAULT_MODEL = "llama-3.1-8b-instant"; // known-active free-tier model

// export const AI_MODEL = (() => {
//   const requested = process.env.AI_MODEL?.trim();
//   if (requested && SUPPORTED_MODELS.includes(requested)) return requested;

//   if (requested) {
//     console.warn(
//       `⚠️  AI_MODEL "${requested}" not in supported list — falling back to "${DEFAULT_MODEL}".`
//     );
//   }
//   return DEFAULT_MODEL;
// })();

export const verifyAIClient = () => {
  const c = getAIClient();
  if (!c) {
    console.warn("⚠️  GROQ_API_KEY not set in .env — AI chatbot disabled.");
    console.warn("   → Get a FREE key at: https://console.groq.com/keys");
  } else {
    console.log(`🤖 AI chatbot ready — model: ${AI_MODEL} (Groq, free tier)`);
  }
};
