"use client";

import { useState } from "react";
import TranscribeForm from "@/components/TranscribeForm";
import TranscriptDownload from "@/components/TranscriptDownload";

export default function Transcribe() {
  const [transcript, setTranscript] = useState<ProcessedTranscript | null>(
    null,
  );
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  return (
    <div>
      {showTranscript ? (
        <TranscriptDownload />
      ) : (
        <TranscribeForm
          transcript={transcript}
          setTranscript={setTranscript}
          setShowTranscript={setShowTranscript}
        />
      )}
    </div>
  );
}
