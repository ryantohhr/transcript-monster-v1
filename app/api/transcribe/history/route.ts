import { fetchTranscriptHistory } from "@/lib/transcript/transcribe";

export async function GET() {
  const transcriptHistory = await fetchTranscriptHistory();

  return Response.json({ transcriptHistory });
}
