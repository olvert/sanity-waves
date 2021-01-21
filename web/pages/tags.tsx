import React from 'react';
import { GetServerSideProps } from 'next';

import SiteLayout from '../components/SiteLayout';
import { getSiteSettings, getTags } from '../lib/sanityQueries';
import { SiteSettings, Tag } from '../../studio/models';

type Props = {
  settings: SiteSettings;
  tags: Tag[];
}

const TagsPage = (props: Props): JSX.Element => {
  const { settings, tags } = props;

  return (
    <SiteLayout settings={settings}>
      <div className="grid grid-cols-2 lg:grid-cols-3 mb-10">
        { tags.map((t) => <div key={t.slug.current}><a href={t.slug.current} className="border-transparent border-b-2 hover:border-blackish text-base sm:text-xl">{t.title}</a></div>)}
      </div>
    </SiteLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const settingsPromise = getSiteSettings();
  const tagsPromise = getTags();

  const [settings, tags] = await Promise.all([settingsPromise, tagsPromise]);

  return {
    props: {
      settings,
      tags,
    },
  };
};

export default TagsPage;
