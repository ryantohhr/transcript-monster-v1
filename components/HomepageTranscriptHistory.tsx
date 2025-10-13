"use client";

import { useEffect, useState } from "react";
import type { DBTranscript } from "@/types/transcript";
import TranscriptHistoryItem from "./TranscriptHistoryItem";
import { Card } from "./ui/card";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export default function HomepageTranscriptHistory() {
  const [transcriptHistory, setTranscriptHistory] = useState<DBTranscript[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    setIsLoading(true);

    try {
      const res = await fetch(`${NEXT_PUBLIC_APP_URL}/api/transcribe/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setTranscriptHistory(data.transcriptHistory);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="gap-0 mx-15 flex flex-col py-0">
      {transcriptHistory.map((transcript, index) => (
        <TranscriptHistoryItem
          transcript={transcript}
          last={transcriptHistory.length === index + 1}
          key={transcript.id}
        />
      ))}
    </Card>
  );
}
