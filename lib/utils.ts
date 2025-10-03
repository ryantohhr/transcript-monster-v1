import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractVideoId(url: string) {
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2]?.length === 11) {
    return match[2];
  }
}

export function formatDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTranscript(
  transcript: ProcessedTranscript,
  transcriptOptions: TranscriptOptions,
) {
  let fileContent = "";
  switch (transcriptOptions.filetype) {
    case "txt": {
      if (transcriptOptions.showVideoId)
        fileContent += `Video ID: ${transcript.videoId}\n`;
      if (transcriptOptions.showTitle)
        fileContent += `Title: ${transcript.videoTitle}\n`;
      if (transcriptOptions.showPublishDate)
        fileContent += `Published on: ${transcript.publishDate}\n`;
      if (transcriptOptions.showChannelName)
        fileContent += `Channel: ${transcript.channelName}\n`;
      if (
        transcriptOptions.showVideoId ||
        transcriptOptions.showTitle ||
        transcriptOptions.showPublishDate ||
        transcriptOptions.showChannelName
      )
        fileContent += "\n";

      for (let i = 0; i < transcript.timestampChunks.length; i++) {
        fileContent += `${transcriptOptions.showTimestamps && `[${transcript.timestampChunks[i]}] `}${transcript.textChunks[i]}\n`;
      }
    }
  }

  return fileContent;
}
