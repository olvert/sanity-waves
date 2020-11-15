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
      <div className="grid grid-cols-2 lg:grid-cols-3 mb-10">
        { data.allTag.map((t) => <div key={t.slug.current}><a href={t.slug.current} className="border-transparent border-b-2 hover:border-blackish text-base sm:text-xl">{t.title}</a></div>)}
      </div>
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
