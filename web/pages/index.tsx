import React from 'react';
import { GetServerSideProps } from 'next';

import { getPosts, getSiteSettings } from '../lib/sanityQueries';
import { SiteSettings, Post as PostModel } from '../../studio/models';
import PostPage from '../components/PostPage';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
}

const Home = (props: Props): JSX.Element => <PostPage getPosts={getPosts} {...props} />;

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
