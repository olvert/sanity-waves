import React, { useEffect, useState } from 'react';
import AOS, { AosOptions } from 'aos';

import 'aos/dist/aos.css';

import Post from './Post';
import SiteLayout from './SiteLayout';
import InfiniteScroll from './InfiniteScroll';
import { SiteSettings, Post as PostModel, Tag } from '../lib/models';
import EmptyMessage from './EmptyMessage';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  tag?: Tag;
  getPosts: (offset: number) => Promise<PostModel[]>;
}

const PostPage = (props: Props): JSX.Element => {
  const { initialPosts, getPosts, ...rest } = props;
  const [posts, setPosts] = useState<PostModel[]>(initialPosts);

  const options: AosOptions = {
    duration: 300,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  };

  useEffect(() => AOS.init(options), []);
  useEffect(() => setPosts(initialPosts), [initialPosts]);

  const loadMorePosts = async (): Promise<boolean> => {
    const offset = posts.length;

    const newPosts = await getPosts(offset);

    setPosts([...posts, ...newPosts]);

    return newPosts.length === 0;
  };

  if (posts.length === 0) {
    return (
      <SiteLayout {...rest}>
        <EmptyMessage />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout {...rest}>
      <InfiniteScroll loadMore={loadMorePosts} threshold={300}>
        { posts.map((post) => <Post key={post.slug.current} {...post} />) }
      </InfiniteScroll>
    </SiteLayout>
  );
};

export default PostPage;
