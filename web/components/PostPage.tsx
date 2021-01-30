import React, { useState } from 'react';

import Post from './Post';
import SiteLayout from './SiteLayout';
import InfiniteScroll from './InfiniteScroll';
import { SiteSettings, Post as PostModel } from '../lib/models';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  getPosts: (offset: number) => Promise<PostModel[]>
}

const PostPage = (props: Props): JSX.Element => {
  const { settings, initialPosts, getPosts } = props;
  const [posts, setPosts] = useState<PostModel[]>(initialPosts);

  const loadMorePosts = async (): Promise<boolean> => {
    const offset = posts.length;

    const newPosts = await getPosts(offset);

    setPosts([...posts, ...newPosts]);

    return newPosts.length === 0;
  };

  return (
    <SiteLayout settings={settings}>
      <InfiniteScroll loadMore={loadMorePosts} threshold={300}>
        { posts.map((post) => <Post key={post.slug.current} {...post} />) }
      </InfiniteScroll>
    </SiteLayout>
  );
};

export default PostPage;
