import React, { useState } from 'react';
import NextImage from 'next/image';
import { Video } from '../generated/graphql';
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from '../lib/utils';

const renderThumbnail = (videoId: string, activate: () => void): JSX.Element => {
  const thumbnailUrl = getYoutubeThumbnailUrl(videoId);

  return <NextImage
    onClick={activate}
    src={thumbnailUrl}
    width={1280}
    height={720}
  />;
};

const renderIFrame = (videoId: string): JSX.Element => {
  const embedUrl = getYoutubeEmbedUrl(videoId);

  return <iframe
    src={embedUrl}
    allowFullScreen={true}
    frameBorder={0}
  />;
};

const VideoContent = (props: Video): JSX.Element => {
  const { videoId } = props;

  const [isActive, setActive] = useState<boolean>(false);
  const activate = () => setActive(true);

  return isActive
    ? renderIFrame(videoId)
    : renderThumbnail(videoId, activate);
};

export default VideoContent;
