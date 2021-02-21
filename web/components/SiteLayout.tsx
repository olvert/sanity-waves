import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import { SiteSettings, Tag } from '../lib/models';
import { getHost, getVersion } from '../lib/utils';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  settings: SiteSettings;
  tag?: Tag;
}

const getMetaTitleWithPageName = (siteTitle: string, pageTitle?: string): string => `${pageTitle} — ${siteTitle}`;

const parseMetaTitle = (siteTitle: string, pathName: string, tag?: Tag): string => {
  switch (pathName) {
    case '/tags':
      return getMetaTitleWithPageName(siteTitle, 'Tags');
    case '/playlist':
      return getMetaTitleWithPageName(siteTitle, 'Playlist');
    case '/tag/[slug]':
      return getMetaTitleWithPageName(siteTitle, tag.title);
    case '/':
      return siteTitle;
    default:
      return siteTitle;
  }
};

const renderMeta = (settings: SiteSettings, router: NextRouter, tag?: Tag): JSX.Element => {
  const { metaDescription, siteTitle } = settings;
  const host = getHost();

  const metaTitle = parseMetaTitle(siteTitle, router.pathname, tag);

  return (
    <React.Fragment>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${host}${router.asPath}`} />
      <meta property="og:image" content={`${host}/api/ogimage`} />
    </React.Fragment>
  );
};

const SiteLayout = (props: Props): JSX.Element => {
  const { children, settings, tag } = props;
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        {renderMeta(settings, router, tag)}
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
