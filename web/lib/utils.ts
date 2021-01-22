import { Video } from '../../studio/models';

const prependZeroes = (s: string, length: number): string => `${'0'.repeat(length - s.length)}${s}`;

export const isVideo = (value: unknown): value is Video => (value as Video).videoId !== undefined;

export const getYoutubeThumbnailUrl = (id: string): string => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const getYoutubeEmbedUrl = (id: string): string => `https://www.youtube.com/embed/${id}?autoplay=1`;

export const formatDate = (dateString: string): string => {
  const d = new Date(dateString);

  const year = d.getFullYear().toString().substr(2);
  const month = (d.getMonth() + 1).toString();
  const day = d.getDate().toString();

  return `${prependZeroes(day, 2)}/${prependZeroes(month, 2)}/${prependZeroes(year, 2)}`;
};

export const isClient = (): boolean => typeof window !== 'undefined';
export const isServer = (): boolean => typeof window === 'undefined';

export const getTagPageHref = (slug: string): string => `/tag/${encodeURIComponent(slug)}`;
