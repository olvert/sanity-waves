import { Video } from '../generated/graphql';

const isVideo = (value: unknown): value is Video => (value as Video).videoId !== undefined;

export default isVideo;
