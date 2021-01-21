/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { Post as Props } from '../../studio/models';
import { formatDate, isVideo } from '../lib/utils';
import ImageContent from './ImageContent';
import PostTag from './PostTag';
import VideoContent from './VideoContent';

const separator = ' / ';

const Post = (props: Props): JSX.Element => {
  const {
    title,
    body,
    tags,
    publishedAt,
    hideTitle,
  } = props;

  return (
    <article className="w-full inline-block mb-3 sm:mb-4 lg:mb-6">
      { body.map((content) => (
        isVideo(content)
          ? <VideoContent key={content._key} {...content} />
          : <ImageContent key={content._key} {...content} />
      ))}

      <div className="flex justify-between mt-1 text-xxs sm:text-xs">
        <div className="flex-grow">
        { hideTitle === false && <span className="text-grayish">{title} {separator}</span> }
          { tags.map((tag, i) => (
            <Fragment key={tag.slug.current}>
              <PostTag {...tag} />
              { i < tags.length - 1 && separator}
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
