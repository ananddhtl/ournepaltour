import { createFileRoute } from "@tanstack/react-router";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createLovableAiGateway } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are a romantic Nepal travel expert helping a couple plan magical date experiences. Suggest specific, heartfelt, Nepal-specific date ideas based on what they describe. Be warm, personal, and specific to Nepal's landscapes, culture, food, and seasons. They arrive June 28 and stay for 2 months. The locations include Kathmandu, Pokhara, Chitwan, and trekking regions.

For each request, suggest 2 to 3 distinct date ideas. For each idea, use this exact markdown structure:

### {Idea title with a fitting emoji}
**What to do:** A specific, sensory description (1–2 short paragraphs).
**Best time of day:** When this is most magical and why.
**What to bring:** A short bullet list.
**Why it's special:** One warm sentence about why this moment will matter to them.

Keep the tone like a thoughtful friend, not a tour brochure. Mention real places, dishes, and small cultural details. Account for monsoon season (late July–August) in your suggestions.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages }: { messages: UIMessage[] } = await request.json();
        const gateway = createLovableAiGateway();
        const result = streamText({
          model: gateway.chatModel("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse();
      },
    },
  },
});
