/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { Post as Props } from '../lib/models';
import { formatDate, isVideo } from '../lib/utils';
import ImageContent from './ImageContent';
import PostTag from './PostTag';
import VideoContent from './VideoContent';

const titleSeparator = ' — ';
const tagSeparator = ' / ';

const Post = (props: Props): JSX.Element => {
  const {
    title,
    body,
    tags,
    publishedAt,
    hideTitle,
  } = props;

  return (
    <article data-aos="fade" className="w-full inline-block mb-3 sm:mb-4 lg:mb-6">
      { body && body.map((content) => (
        isVideo(content)
          ? <VideoContent key={content._key} {...content} />
          : <ImageContent key={content._key} {...content} />
      ))}

      <div className="flex justify-between mt-1 text-xs sm:text-base">
        <div className="flex-grow">
          { hideTitle === false && <span>{title} {titleSeparator}</span> }
          { tags && tags.map((tag, i) => (
            <Fragment key={tag.slug.current}>
              <PostTag {...tag} />
              { i < tags.length - 1 && tagSeparator }
            </Fragment>
          ))}
        </div>
        <div className="flex-none pl-2">
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </div>
      </div>
    </article>
  );
};

export default Post;
