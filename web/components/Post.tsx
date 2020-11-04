import React from 'react';
import { Post as Props } from '../generated/graphql';

const Post = (props: Props): JSX.Element => {
  const { title } = props;

  return (
    <article>
      <h2>{title}</h2>
    </article>
  );
};

export default Post;
