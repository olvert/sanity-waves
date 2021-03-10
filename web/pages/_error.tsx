import { GetServerSideProps } from 'next';
import React from 'react';
import PageMessage from '../components/PageMessage';
import SiteLayout from '../components/SiteLayout';
import { SiteSettings } from '../lib/models';
import { getSiteSettings } from '../lib/sanityQueries';

type Props = {
  statusCode: number;
  settings: SiteSettings;
}

const formatMessage = (statusCode: number): string => `${statusCode}. An error has occurred. This is sad.`;

const Error = (props: Props): JSX.Element => {
  const { statusCode, settings } = props;

  return (
    <SiteLayout settings={settings} flexMain={true}>
      <PageMessage message={formatMessage(statusCode)} />
    </SiteLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;
  const { statusCode } = res;

  const settings = await getSiteSettings();

  return {
    props: {
      statusCode,
      settings,
    },
  };
};

export default Error;
