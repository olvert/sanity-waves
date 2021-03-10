import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import {
  getTagPosts,
  getSiteSettings,
  getTag,
  getTags,
} from '../../lib/sanityQueries';
import { SiteSettings, Post as PostModel, Tag } from '../../lib/models';
import PostPage from '../../components/PostPage';
import { unwrap } from '../../lib/utils';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  tag: Tag;
}

type Path = {
  params: {
    slug: string;
  }
}

const tagToPath = (t: Tag): Path => ({ params: { slug: t.slug.current } });

const TagPostPage = (props: Props): JSX.Element => <PostPage {...props} />;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = '' } = context.params;

  const unwrappedSlug = unwrap<string>(slug);

  const settingsPromise = getSiteSettings();
  const tagPromise = getTag(unwrappedSlug);
  const initialPostsPromise = getTagPosts(unwrappedSlug, 0);

  const [settings, tag, initialPosts] = await Promise.all([
    settingsPromise,
    tagPromise,
    initialPostsPromise,
  ]);

  if (tag === null) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  return {
    props: {
      settings,
      initialPosts,
      tag,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags();

  return {
    paths: tags.filter((t) => t.slug !== undefined).map(tagToPath),
    fallback: 'blocking',
  };
};

export default TagPostPage;
