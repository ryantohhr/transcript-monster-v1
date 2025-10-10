import { CalendarDays, User } from "lucide-react";
import type { ProcessedTranscript } from "@/types/transcript";
import Thumbnail from "./Thumbnail";

export default function TranscriptPreview({
  transcript,
}: {
  transcript: ProcessedTranscript;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-md bg-green-50 border-2 border-green-600 w-full">
      <h1 className="font-semibold text-green-800">{transcript.videoTitle}</h1>
      <div className="flex gap-3">
        <Thumbnail url={transcript.thumbnailUrl} alt={transcript.videoTitle} />
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
