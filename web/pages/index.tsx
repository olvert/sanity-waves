import React from 'react';
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
import SiteLayout from '../components/SiteLayout';
import InfiniteScroll from '../components/InfiniteScroll';

const POSTS_PER_PAGE = 5;

const Home = (): JSX.Element => {
  const {
    loading,
    data,
    fetchMore,
  } = usePostsByPaginationQuery({
    variables: {
      limit: POSTS_PER_PAGE,
      offset: 0,
    },
  });

  const loadMorePosts = (): Promise<unknown> => {
    const currentLength = data.allPost.length;
    return fetchMore({
      variables: {
        limit: POSTS_PER_PAGE,
        offset: currentLength,
      },
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <SiteLayout>
      <InfiniteScroll loadMore={loadMorePosts}>
        { data
          && data.allPost
          && data.allPost.map((post) => <Post key={post.slug.current} {...post} />)
        }
      </InfiniteScroll>
      <button onClick={loadMorePosts}>
        Load more
      </button>
    </SiteLayout>
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
