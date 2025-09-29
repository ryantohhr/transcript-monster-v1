import { fetchProcessTranscript } from "@/lib/transcript/transcribe";

export async function POST(request: Request) {
  const body = await request.json();
  const videoUrl = body.url;

  const res = await fetchProcessTranscript(videoUrl);

  return Response.json({ transcript: res });
}
