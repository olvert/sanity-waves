import React from 'react';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import {
  SiteSettingsDocument,
  SiteSettingsQuery,
  SiteSettingsQueryVariables,
  TagsDocument,
  TagsQuery,
  TagsQueryVariables,
  useTagsQuery,
} from '../generated/graphql';

import SiteLayout from '../components/SiteLayout';

const TagsPage = (): JSX.Element => {
  const { loading, data } = useTagsQuery();

  return (
    <SiteLayout>
      { data.allTag.map((t) => <a key={t.slug.current} href={t.slug.current}>{t.title}</a>)}
    </SiteLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const tagsPromise = apolloClient.query<TagsQuery, TagsQueryVariables>({
    query: TagsDocument,
  });

  const siteSettingsPromise = apolloClient.query<SiteSettingsQuery, SiteSettingsQueryVariables>({
    query: SiteSettingsDocument,
  });

  await Promise.all([tagsPromise, siteSettingsPromise]);

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState,
    },
  };
};

export default TagsPage;
