import { useState } from "react";
import { formatTranscript } from "@/lib/utils";
import DownloadFilePreview from "./DownloadFilePreview";
import TranscriptPreview from "./TranscriptPreview";
import { Card } from "./ui/card";

const defaultTranscriptOptions: TranscriptOptions = {
  filetype: "txt",
  showVideoId: true,
  showTitle: true,
  showChannelName: true,
  showPublishDate: true,
  showTimestamps: true,
};

export default function TranscriptDownload({
  transcript,
}: {
  transcript: ProcessedTranscript;
}) {
  const [previewOptions, setPreviewOptions] = useState<TranscriptOptions>(
    defaultTranscriptOptions,
  );
  const [transcriptText, setTranscriptText] = useState<string>(
    formatTranscript(transcript, defaultTranscriptOptions),
  );

  return (
    <div className="grid grid-cols-2 gap-10 p-10">
      <Card className="p-10">
        <TranscriptPreview transcript={transcript} />
        <DownloadFilePreview transcriptText={transcriptText} />
      </Card>
      <Card></Card>
    </div>
  );
}
