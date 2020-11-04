import React from 'react';
import {
  NextPage,
  GetServerSideProps,
} from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import {
  PostBySlugDocument,
  PostBySlugQuery,
  PostBySlugQueryVariables,
  usePostBySlugQuery,
} from '../../generated/graphql';

import Post from '../../components/Post';

type Props = {
  slug: string;
};

const SinglePostPage: NextPage<Props> = (props: Props) => {
  const { slug } = props;
  const { loading, data } = usePostBySlugQuery({ variables: { slug } });

  const post = data.allPost[0];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <Post {...post} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug = '' } = context.params;
  const apolloClient = initializeApollo();

  await apolloClient.query<PostBySlugQuery, PostBySlugQueryVariables>({
    query: PostBySlugDocument,
    variables: {
      slug: slug as string,
    },
  });

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      slug,
      initialApolloState,
    },
  };
};

export default SinglePostPage;
