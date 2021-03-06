import React from 'react';
import { GetStaticProps } from 'next';

import { getPosts, getSiteSettings } from '../lib/sanityQueries';
import { SiteSettings, Post as PostModel } from '../lib/models';
import PostPage from '../components/PostPage';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
}

const Home = (props: Props): JSX.Element => <PostPage {...props} />;

export const getStaticProps: GetStaticProps = async () => {
  const settingsPromise = getSiteSettings();
  const initialPostsPromise = getPosts(0);

  const [settings, initialPosts] = await Promise.all([settingsPromise, initialPostsPromise]);

  return {
    props: {
      settings,
      initialPosts,
    },
    revalidate: 1,
  };
};

export default Home;
