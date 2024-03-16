import { google } from 'googleapis';
import { env } from '@/env';

export const fetchYoutubeVideoInfo = async (videoId: string) => {
  const youtube = google.youtube({
    version: 'v3',
    auth: env.YOUTUBE_API_KEY,
  });

  const result = await youtube.videos.list({
    part: ['snippet', 'contentDetails', 'statistics'],
    id: [videoId],
  });

  if (result.status !== 200) {
    throw new Error(`Failed to fetch video info for videoId: ${videoId}, ${result.status} ${result.statusText}`);
  }

  const videoInfo = result.data.items?.[0];

  if (!videoInfo) {
    throw new Error(`Failed to fetch video info for videoId: ${videoId}`);
  }

  return {
    title: videoInfo?.snippet?.title,
    description: videoInfo?.snippet?.description,
    thumbnail: videoInfo?.snippet?.thumbnails?.default?.url,
    duration: videoInfo?.contentDetails?.duration,
    viewCount: videoInfo?.statistics?.viewCount,
    likeCount: videoInfo?.statistics?.likeCount,
    dislikeCount: videoInfo?.statistics?.dislikeCount,
    publishedAt: videoInfo?.snippet?.publishedAt,
  };
};
