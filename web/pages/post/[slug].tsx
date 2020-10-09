import React from 'react';
import { NextPage } from 'next';

import client from '../../client';

type Props = {
  slug: {
    current: string;
  },
};

const Post: NextPage<Props> = (props: Props) => (
  <article>
    <h1>{props.slug.current}</h1>
  </article>
);

Post.getInitialProps = async (context) => {
  const { slug = '' } = context.query;
  return client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });
};

export default Post;
