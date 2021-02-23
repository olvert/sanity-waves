import React, { useState } from 'react';
import NextImage from 'next/image';
import { Video } from '../lib/models';
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from '../lib/utils';

const renderThumbnail = (videoId: string, activate: () => void): JSX.Element => {
  const thumbnailUrl = getYoutubeThumbnailUrl(videoId);

  return (
    <div onClick={activate}>
      <NextImage
        src={thumbnailUrl}
        width={1280}
        height={720}
        layout="responsive"
        alt=""
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 bg-white rounded-circle p-3 sm:p-5 shadow-xl cursor-pointer">
          <img className="w-3 h-3 sm:w-6 sm:h-6" width="24" height="24" src="/icons/play-solid.svg" style={{ paddingLeft: 2 }} alt="Play" />
        </div>
      </div>
    </div>
  );
};

const renderIFrame = (videoId: string): JSX.Element => {
  const embedUrl = getYoutubeEmbedUrl(videoId);

  return <iframe
    className="absolute top-0 left-0 w-full h-full z-20"
    src={embedUrl}
    allowFullScreen={true}
    frameBorder={0}
  />;
};

const VideoContent = (props: Video): JSX.Element => {
  const { videoId } = props;

  const [isActive, setActive] = useState<boolean>(false);
  const activate = () => setActive(true);

  return (
    <div className="aspect-ratio ar-16-9 bg-black cursor-pointer">
      { isActive
        ? renderIFrame(videoId)
        : renderThumbnail(videoId, activate)
      }
    </div>
  );
};

export default VideoContent;
