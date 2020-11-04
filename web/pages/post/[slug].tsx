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

type Props = {
  slug: string;
};

const Post: NextPage<Props> = (props: Props) => {
  const { slug } = props;
  const { loading, data } = usePostBySlugQuery({ variables: { slug } });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <article>
      <h1>{JSON.stringify(data)}</h1>
    </article>
  );
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

export default Post;
