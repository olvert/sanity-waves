import React from 'react';
import Link from 'next/link';
import { Tag as Props } from '../lib/models';
import { getTagPageHref } from '../lib/utils';

const PostTag = (props: Props): JSX.Element => {
  const { slug, title } = props;

  return (
    <Link href={getTagPageHref(slug.current)}>
      <a className="border-b border-transparent hover:border-blackish">
        {title}
      </a>
    </Link>
  );
};

export default PostTag;
