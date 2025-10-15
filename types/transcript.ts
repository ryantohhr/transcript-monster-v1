import type { LucideIcon } from "lucide-react";

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

export type DBTranscript = ProcessedTranscript & {
  id: number;
  createdAt: string;
};

export type Filetype = "txt";

export type TranscriptOptions = {
  [key: string]: any;
  filetype: Filetype;
  showVideoId: boolean;
  showTitle: boolean;
  showChannelName: boolean;
  showPublishDate: boolean;
  showTimestamps: boolean;
};

export type FiletypeData = {
  type: Filetype;
  title: string;
  desc: string;
  icon: LucideIcon;
};

export type TranscriptLookupItem = {
  id: number;
  created_at: string;
  user_id: string;
  video_id: string;
};
