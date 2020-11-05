import { Video } from '../generated/graphql';

export const isVideo = (value: unknown): value is Video => (value as Video).videoId !== undefined;

export const getYoutubeThumbnailUrl = (id: string): string => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const getYoutubeEmbedUrl = (id: string): string => `https://www.youtube.com/embed/${id}?autoplay=1`;
