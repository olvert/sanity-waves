import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import {
  PostsByPaginationDocument,
  PostsByPaginationQuery,
  PostsByPaginationQueryVariables,
  SiteSettingsDocument,
  SiteSettingsQuery,
  SiteSettingsQueryVariables,
  usePostsByPaginationQuery,
} from '../generated/graphql';

import Post from '../components/Post';
import Header from '../components/Header';

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

      <main className="container mx-auto lg:mx-0 px-2 lg:px-4 xl:pl-8 pt-4 sm:pt-6 xl:pt-10 xl:pr-32">
        <Header />
        { data.allPost.map((post) => <Post key={post.slug.current} {...post} />) }
      </main>

      <footer>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const postsPromise = apolloClient.query<PostsByPaginationQuery, PostsByPaginationQueryVariables>({
    query: PostsByPaginationDocument,
    variables: {
      limit: POSTS_PER_PAGE,
      offset: 0,
    },
  });

  const siteSettingsPromise = apolloClient.query<SiteSettingsQuery, SiteSettingsQueryVariables>({
    query: SiteSettingsDocument,
  });

  await Promise.all([postsPromise, siteSettingsPromise]);

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState,
    },
  };
};

export default Home;
