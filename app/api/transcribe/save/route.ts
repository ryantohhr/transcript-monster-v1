import { saveTranscript } from "@/lib/transcript/transcribe";

export async function POST(request: Request) {
  const body = await request.json();
  const transcript = body.transcript;

  const res = await saveTranscript(transcript);

  return Response.json({ response: res });
}
