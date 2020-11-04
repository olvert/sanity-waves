/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Post as Props } from '../generated/graphql';
import isVideo from '../lib/utils';
import ImageContent from './ImageContent';

const Post = (props: Props): JSX.Element => {
  const { title, body } = props;

  return (
    <article>
      <h2>{title}</h2>
      { body.map((content) => (isVideo(content) ? 'video' : <ImageContent key={content._key} {...content} />))}
    </article>
  );
};

export default Post;
