import React from 'react';
import { GetServerSideProps } from 'next';

import { getTagPosts, getSiteSettings, getTag } from '../../lib/sanityQueries';
import { SiteSettings, Post as PostModel, Tag } from '../../lib/models';
import PostPage from '../../components/PostPage';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  tag: Tag;
}

const Home = (props: Props): JSX.Element => {
  const { tag } = props;
  const getPosts = (offset: number) => getTagPosts(tag.slug.current, offset);
  return <PostPage getPosts={getPosts} {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug = '' } = context.params;

  const settingsPromise = getSiteSettings();
  const tagPromise = getTag(slug as string);
  const initialPostsPromise = getTagPosts(slug as string, 0);

  const [settings, tag, initialPosts] = await Promise.all([
    settingsPromise,
    tagPromise,
    initialPostsPromise,
  ]);

  return {
    props: {
      settings,
      initialPosts,
      tag,
    },
  };
};

export default Home;
