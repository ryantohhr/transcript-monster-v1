"use client";

import { useState } from "react";
import TranscribeForm from "@/components/TranscribeForm";

export default function Transcribe() {
  const [transcript, setTranscript] = useState<ProcessedTranscript | null>(
    null,
  );

  return (
    <div className="h-full flex justify-center items-start">
      <TranscribeForm transcript={transcript} setTranscript={setTranscript} />
    </div>
  );
}
