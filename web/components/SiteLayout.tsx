import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import { SiteSettings } from '../lib/models';
import { getHost, getVersion } from '../lib/utils';
import Header from './Header';

type Props = {
  children: React.ReactNode,
  settings: SiteSettings,
}

const renderMeta = (settings: SiteSettings, path: string): JSX.Element => {
  const { metaDescription, siteTitle } = settings;
  const host = getHost();

  return (
    <React.Fragment>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${host}${path}`} />
      <meta property="og:image" content={`${host}/api/ogimage`} />
    </React.Fragment>
  );
};

const SiteLayout = (props: Props): JSX.Element => {
  const { children, settings } = props;
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        {renderMeta(settings, router.asPath)}
      </Head>

      <div className="container min-h-screen flex flex-col justify-between mx-auto lg:mx-0 px-2 lg:px-4 xl:pl-8 xl:pr-32">
        <main className="pt-4 sm:pt-6 xl:pt-10">
          <Header {...settings} />
          { children }
        </main>

        <footer className="my-2">
          <p className="text-grayish text-center text-xxs sm:text-xs">
            {getVersion()}
          </p>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default SiteLayout;
