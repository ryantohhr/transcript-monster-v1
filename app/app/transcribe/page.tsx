"use client";

import { useEffect, useState } from "react";
import TranscribeForm from "@/components/TranscribeForm";
import TranscriptDownload from "@/components/TranscriptDownload";
import type { ProcessedTranscript } from "@/types/transcript";

export default function Transcribe() {
  const [transcript, setTranscript] = useState<ProcessedTranscript | null>(
    null,
  );
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  useEffect(() => {
    const storedTranscript = localStorage.getItem("transcript");

    if (storedTranscript) {
      setTranscript(JSON.parse(storedTranscript));
      setShowTranscript(true);
      localStorage.setItem("transcript", "");
    }
  }, []);

  return (
    <div>
      {showTranscript && transcript ? (
        <TranscriptDownload transcript={transcript} />
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
