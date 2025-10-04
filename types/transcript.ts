export type ProcessedTranscript = {
  videoId: string;
  videoUrl: string;
  videoTitle: string;
  channelName: string;
  thumbnailUrl: string;
  publishDate: string;
  textChunks: string[];
  timestampChunks: string[];
};

export type TranscriptOptions = {
  filetype: "txt";
  showVideoId: boolean;
  showTitle: boolean;
  showChannelName: boolean;
  showPublishDate: boolean;
  showTimestamps: boolean;
};
