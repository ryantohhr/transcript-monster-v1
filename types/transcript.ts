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

export type DBTranscript = {
  id: number;
  created_at: string;
  video_id: string;
  video_url: string;
  video_title: string;
  channel_name: string;
  thumbnail_url: string;
  publish_date: string;
  text_chunks: string[];
  timestamp_chunks: string[];
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
