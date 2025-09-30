import { fetchTranscript } from "youtube-transcript-plus";
import type { TranscriptResponse } from "youtube-transcript-plus/dist/types";
import { createClient } from "../supabase/server";
import { extractVideoId, formatDate } from "../utils";

const CHUNK_SIZE = 3;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function fetchProcessTranscript(url: string) {
  const videoId = extractVideoId(url);
  if (!videoId) return null;

  const rawTranscript = await fetchTranscript(videoId);

  const [textChunks, timestampChunks] = processTranscript(rawTranscript);
  const [videoTitle, channelName, thumbnailUrl, publishDate] =
    await getTranscriptMetadata(videoId);

  const transcript = {
    videoId,
    videoUrl: url,
    videoTitle,
    channelName,
    thumbnailUrl,
    publishDate,
    textChunks,
    timestampChunks,
  };

  return transcript;
}

function processTranscript(transcript: TranscriptResponse[]) {
  const textChunks: string[] = [];
  const timestampChunks: number[] = [];

  for (let i = 0; i < transcript.length; i += CHUNK_SIZE) {
    const currentText = [];
    for (let j = 0; j < CHUNK_SIZE; j++) {
      if (i + j >= transcript.length) break;
      currentText.push(transcript[i + j].text);
    }
    textChunks.push(currentText.join(" "));

    const currentTimestamp = transcript[i].offset;
    timestampChunks.push(currentTimestamp);
  }

  return [textChunks, timestampChunks];
}

async function getTranscriptMetadata(videoId: string) {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`,
  );
  const data = await res.json();
  const snippet = data.items[0].snippet;

  return [
    snippet.title,
    snippet.channelTitle,
    snippet.thumbnails.maxres.url,
    formatDate(snippet.publishedAt),
  ];
}

export async function saveTranscript(transcript: ProcessedTranscript) {
  const saveData = await saveTranscriptData(transcript);
  const userData = await saveUserTranscriptRelation(transcript.videoId);

  return [saveData, userData];
}

async function saveTranscriptData(transcript: ProcessedTranscript) {
  const supabase = await createClient();
  const { data } = await supabase.from("transcripts").insert([
    {
      video_id: transcript.videoId,
      video_url: transcript.videoUrl,
      video_title: transcript.videoTitle,
      channel_name: transcript.channelName,
      thumbnail_url: transcript.thumbnailUrl,
      publish_date: transcript.publishDate,
      text_chunks: transcript.textChunks,
      timestamp_chunks: transcript.timestampChunks,
    },
  ]);

  return data;
}

async function saveUserTranscriptRelation(videoId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const res = await supabase
    .from("user_transcripts")
    .insert([{ user_id: user.id, video_id: videoId }]);

  return res;
}
