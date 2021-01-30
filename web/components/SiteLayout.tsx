import Head from 'next/head';
import React from 'react';
import { SiteSettings } from '../lib/models';
import { getVersion } from '../lib/utils';
import Header from './Header';

type Props = {
  children: React.ReactNode,
  settings: SiteSettings,
}

const SiteLayout = (props: Props): JSX.Element => {
  const { children, settings } = props;
  const { siteTitle } = settings;

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto lg:mx-0 px-2 lg:px-4 xl:pl-8 pt-4 sm:pt-6 xl:pt-10 xl:pr-32">
        <Header {...settings} />
        { children }
      </main>

      <footer className="container mx-auto lg:mx-0 px-2 lg:px-4 xl:pl-8 xl:pr-32 mb-2">
        <p className="text-grayish text-center text-xxs sm:text-xs py-3">
          {getVersion()}
        </p>
      </footer>
    </div>
  );
};

export default SiteLayout;
