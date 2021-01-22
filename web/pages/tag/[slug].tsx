import React from 'react';
import { GetServerSideProps } from 'next';

import { getTagPosts, getSiteSettings } from '../../lib/sanityQueries';
import { SiteSettings, Post as PostModel } from '../../../studio/models';
import PostPage from '../../components/PostPage';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  slug: string;
}

const Home = (props: Props): JSX.Element => {
  const { slug } = props;
  const getPosts = (offset: number) => getTagPosts(slug, offset);
  return <PostPage getPosts={getPosts} {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug = '' } = context.params;
  const settingsPromise = getSiteSettings();
  const initialPostsPromise = getTagPosts(slug as string, 0);

  const [settings, initialPosts] = await Promise.all([settingsPromise, initialPostsPromise]);

  return {
    props: {
      settings,
      initialPosts,
      slug,
    },
  };
};

export default Home;
