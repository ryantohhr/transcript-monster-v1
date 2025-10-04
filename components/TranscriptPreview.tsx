import { CalendarDays, User } from "lucide-react";
import Image from "next/image";
import type { ProcessedTranscript } from "@/types/transcript";

export default function TranscriptPreview({
  transcript,
}: {
  transcript: ProcessedTranscript;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-md bg-green-50 border-2 border-green-600 w-full">
      <h1 className="font-semibold text-green-800">{transcript.videoTitle}</h1>
      <div className="flex gap-3">
        <Image
          src={transcript.thumbnailUrl}
          width={240}
          height={120}
          className="rounded-md"
          alt={transcript.videoTitle}
        />
        <div className="flex flex-col gap-2 text-sm font-semibold">
          <h2 className="flex gap-1 text-green-800">
            <User size={20} /> {transcript.channelName}
          </h2>
          <p className="flex gap-1 text-gray-700">
            <CalendarDays size={20} />
            {transcript.publishDate}
          </p>
        </div>
      </div>
    </div>
  );
}
