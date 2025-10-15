import { useRouter } from "next/navigation";
import type { DBTranscript } from "@/types/transcript";
import Thumbnail from "./Thumbnail";

export default function TranscriptHistoryItem({
  transcript,
}: {
  transcript: DBTranscript;
}) {
  const router = useRouter();

  function handleHistoryItemClick(transcript: DBTranscript) {
    localStorage.setItem("transcript", JSON.stringify(transcript));
    router.push("/app/transcribe");
  }

  return (
    <div
      onClick={() => handleHistoryItemClick(transcript)}
      className="cursor-pointer border-t-2"
    >
      <div className="flex gap-4 p-4">
        <Thumbnail
          url={transcript.thumbnailUrl}
          width={120}
          height={60}
          alt={transcript.videoTitle}
        />

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {transcript.videoTitle}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {transcript.publishDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
