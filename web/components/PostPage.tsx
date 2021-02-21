import React, { useState } from 'react';

import Post from './Post';
import SiteLayout from './SiteLayout';
import InfiniteScroll from './InfiniteScroll';
import { SiteSettings, Post as PostModel, Tag } from '../lib/models';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  tag?: Tag;
  getPosts: (offset: number) => Promise<PostModel[]>;
}

const PostPage = (props: Props): JSX.Element => {
  const { initialPosts, getPosts, ...rest } = props;
  const [posts, setPosts] = useState<PostModel[]>(initialPosts);

  const loadMorePosts = async (): Promise<boolean> => {
    const offset = posts.length;

    const newPosts = await getPosts(offset);

    setPosts([...posts, ...newPosts]);

    return newPosts.length === 0;
  };

  return (
    <SiteLayout {...rest}>
      <InfiniteScroll loadMore={loadMorePosts} threshold={300}>
        { posts.map((post) => <Post key={post.slug.current} {...post} />) }
      </InfiniteScroll>
    </SiteLayout>
  );
};

export default PostPage;
