import React from 'react';
import { Tag as Props } from '../generated/graphql';

const PostTag = (props: Props): JSX.Element => {
  const { slug, title } = props;

  return <a
    className="border-b border-transparent hover:border-blackish"
    href={`/${slug.current}`}
  >
    {title.toLowerCase()}
  </a>;
};

export default PostTag;
