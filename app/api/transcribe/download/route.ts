import { NextResponse } from "next/server";
import { formatTranscript } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const transcript = body.transcript;
  const transcriptDownloadOptions = body.transcriptDownloadOptions;

  const fileContent = formatTranscript(transcript, transcriptDownloadOptions);

  const headers = new Headers();
  headers.append("Content-Type", "text/plain");
  headers.append("Content-Disposition", "attachment");

  return new NextResponse(fileContent, { headers });
}
