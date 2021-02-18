import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import SiteLayout from '../components/SiteLayout';
import { getSiteSettings, getTags } from '../lib/sanityQueries';
import { SiteSettings, Tag } from '../lib/models';
import { getTagPageHref } from '../lib/utils';

type Props = {
  settings: SiteSettings;
  tags: Tag[];
}

const TagsPage = (props: Props): JSX.Element => {
  const { settings, tags } = props;

  return (
    <SiteLayout settings={settings}>
      <div className="wvs-tags mb-10">
        { tags.map((t) => (
          <div key={t.slug.current}>
            <Link href={getTagPageHref(t.slug.current)}>
              <a className="border-transparent border-b-2 hover:border-blackish text-base sm:text-xl sm:leading-normal">
                {t.title}
              </a>
            </Link>
          </div>
        ))}
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
