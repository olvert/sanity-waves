import { version } from '../package.json';
import { Post, Video } from './models';

const prependZeroes = (s: string, length: number): string => `${'0'.repeat(Math.max(length - s.length, 0))}${s}`;

export const isVideo = (value: unknown): value is Video => (value as Video).videoId !== undefined;

export const getYoutubeThumbnailUrl = (id: string): string => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const getYoutubeEmbedUrl = (id: string): string => `https://www.youtube.com/embed/${id}?autoplay=1`;

export const formatDate = (dateString: string): string => {
  const d = new Date(dateString);

  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString();
  const day = d.getDate().toString();

  return `${prependZeroes(year, 4)}-${prependZeroes(month, 2)}-${prependZeroes(day, 2)}`;
};

export const isClient = (): boolean => typeof window !== 'undefined';
export const isServer = (): boolean => typeof window === 'undefined';

export const getTagPageHref = (slug: string): string => `/tag/${encodeURIComponent(slug)}`;

export const getVersion = (): string => `v${version}`;

export const getOgImageUrlFromPost = (post: Post): string => {
  const [content] = post.body;
  return isVideo(content) ? getYoutubeThumbnailUrl(content.videoId) : content.asset.url;
};

export const getHost = (): string => process.env.NEXT_PUBLIC_HOST;
