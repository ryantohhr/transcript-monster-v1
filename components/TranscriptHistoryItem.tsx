import type { DBTranscript } from "@/types/transcript";
import Thumbnail from "./Thumbnail";

export default function TranscriptHistoryItem({
  transcript,
  last,
}: {
  transcript: DBTranscript;
  last: boolean;
}) {
  return (
    <div className={`cursor-pointer ${last ? "" : "border-b-2"}`}>
      <div className="flex gap-4 p-4">
        <Thumbnail
          url={transcript.thumbnail_url}
          width={120}
          height={60}
          alt={transcript.video_title}
        />

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {transcript.video_title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {transcript.publish_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
