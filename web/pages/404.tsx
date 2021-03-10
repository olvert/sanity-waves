import { GetStaticProps } from 'next';
import React from 'react';
import PageMessage from '../components/PageMessage';
import SiteLayout from '../components/SiteLayout';
import { SiteSettings } from '../lib/models';
import { getSiteSettings } from '../lib/sanityQueries';

type Props = {
  settings: SiteSettings;
}

const Custom404 = (props: Props): JSX.Element => {
  const { settings } = props;

  return (
    <SiteLayout settings={settings} flexMain={true}>
      <PageMessage message={'404. This page could not be found.'} />
    </SiteLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const settings = await getSiteSettings();

  return {
    props: {
      settings,
    },
    revalidate: 3600,
  };
};

export default Custom404;
