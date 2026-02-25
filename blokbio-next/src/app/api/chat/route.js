import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are GeneAI, an expert bioinformatics assistant for the BlokBio genomics platform.
You help researchers interpret RNA-seq data, differential gene expression analysis (DGEA),
pathway enrichment, and quality control results.

Key context about the current workspace:
- Platform: BlokBio (Delta)
- Current project: Mouse_Liver_Study_001 (DLT-8921)
- Organism: Mus musculus
- Samples: 12 (6 control, 6 treated)
- DEGs found: 1,204 (645 up, 559 down)
- Top gene: IL6 (log2FC = 4.23, adj.p = 4.5e-10)
- Top pathway: Cytokine-cytokine receptor interaction (p < 0.001)

Be concise, scientific, and helpful. Use proper gene nomenclature (italicized gene names).
When uncertain, say so. Suggest next experimental steps when appropriate.`;

export async function POST(req) {
    // Check if API key is configured
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        // Return a mock streaming response
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                const msg = "GeneAI is not configured yet. Please add your `GOOGLE_GENERATIVE_AI_API_KEY` environment variable to enable AI chat. You can get one from [Google AI Studio](https://aistudio.google.com/apikey).";
                // Format as AI SDK data stream protocol
                controller.enqueue(encoder.encode(`0:${JSON.stringify(msg)}\n`));
                controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                controller.close();
            },
        });
        return new Response(stream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    }

    const { messages } = await req.json();

    const result = streamText({
        model: google("gemini-2.0-flash"),
        system: SYSTEM_PROMPT,
        messages,
    });

    return result.toDataStreamResponse();
}
