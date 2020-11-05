import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import {
  PostsByPaginationDocument,
  PostsByPaginationQuery,
  PostsByPaginationQueryVariables,
  usePostsByPaginationQuery,
} from '../generated/graphql';

import Post from '../components/Post';

const POSTS_PER_PAGE = 5;

const Home = (): JSX.Element => {
  const { loading, data } = usePostsByPaginationQuery({
    variables: {
      limit: POSTS_PER_PAGE,
      offset: 0,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        { data.allPost.map((post) => <Post key={post.slug.current} {...post} />) }
      </main>

      <footer>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<PostsByPaginationQuery, PostsByPaginationQueryVariables>({
    query: PostsByPaginationDocument,
    variables: {
      limit: POSTS_PER_PAGE,
      offset: 0,
    },
  });

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState,
    },
  };
};

export default Home;
