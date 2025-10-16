"use client";

import { useEffect, useState } from "react";
import type { DBTranscript } from "@/types/transcript";
import TranscriptHistoryItem from "./TranscriptHistoryItem";
import TranscriptHistorySkeleton from "./TranscriptHistorySkeleton";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export default function HomepageTranscriptHistory() {
  const [transcriptHistory, setTranscriptHistory] = useState<DBTranscript[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [historyFetched, setHistoryFetched] = useState<boolean>(false);

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
      setHistoryFetched(true);
    }
  }

  return (
    <Card className="p-5 gap-0 pb-0 mx-15 flex flex-col">
      <CardTitle className="mb-3 text-xl">History</CardTitle>
      {isLoading ? (
        <TranscriptHistorySkeleton />
      ) : (
        transcriptHistory.map((transcript) => (
          <TranscriptHistoryItem transcript={transcript} key={transcript.id} />
        ))
      )}
      {transcriptHistory.length === 0 && historyFetched && (
        <div className="flex justify-center items-center py-5">
          <Card>
            <CardTitle className="flex flex-col items-center justify-center gap-5 px-8 text-center">
              No transcripts yet, get the transcript of a YouTube video now!
              <Button asChild className="mx-5 bg-red-500 hover:bg-red-700">
                <a href="/app/transcribe">Get Transcripts</a>
              </Button>
            </CardTitle>
          </Card>
        </div>
      )}
    </Card>
  );
}
