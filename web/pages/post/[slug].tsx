import React from 'react';
import {
  NextPage,
  GetServerSideProps,
} from 'next';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';

const GET_POST_BY_SLUG = gql`
  query postBySlug($slug: String!) {
    allPost(where: {slug: { current: { eq: $slug}}}) {
      title,
      tags {
        title,
        slug {
          current
        }
      }
    }
  }
`;

type Props = {
  slug: string;
};

const Post: NextPage<Props> = (props: Props) => {
  const { slug } = props;
  const { loading, data } = useQuery(
    GET_POST_BY_SLUG,
    {
      variables: {
        slug,
      },
    },
  );

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

  await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
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
