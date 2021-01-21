import React, { useState } from 'react';
import { GetServerSideProps } from 'next';

import Post from '../components/Post';
import SiteLayout from '../components/SiteLayout';
import InfiniteScroll from '../components/InfiniteScroll';
import { getPosts, getSiteSettings } from '../lib/sanityQueries';
import { SiteSettings, Post as PostModel } from '../../studio/models';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
}

const Home = (props: Props): JSX.Element => {
  const { settings, initialPosts } = props;
  const [posts, setPosts] = useState<PostModel[]>(initialPosts);

  const loadMorePosts = async (): Promise<boolean> => {
    const offset = posts.length;

    const newPosts = await getPosts(offset);

    setPosts([...posts, ...newPosts]);

    return newPosts.length > 0;
  };

  return (
    <SiteLayout settings={settings}>
      <InfiniteScroll loadMore={loadMorePosts}>
        { posts.map((post) => <Post key={post.slug.current} {...post} />)
        }
      </InfiniteScroll>
      <button onClick={loadMorePosts}>
        Load more
      </button>
    </SiteLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const settingsPromise = getSiteSettings();
  const initialPostsPromise = getPosts(0);

  const [settings, initialPosts] = await Promise.all([settingsPromise, initialPostsPromise]);

  return {
    props: {
      settings,
      initialPosts,
    },
  };
};

export default Home;
