import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import classNames from 'classnames';
import { SiteSettings, Tag } from '../lib/models';
import Header from './Header';
import { getHost, getVersion } from '../lib/utils';

type Props = {
  children: React.ReactNode;
  settings: SiteSettings;
  tag?: Tag;
  flexMain?: boolean;
}

type Meta = {
  pageName: string;
  imageUrl: string;
  pageUrl: string;
}

const parsePageName = (pathName: string, tag?: Tag): string => {
  switch (pathName) {
    case '/tags':
      return 'Tags';
    case '/playlist':
      return 'Playlist';
    case '/tag/[slug]':
      return tag ? tag.title : '';
    case '/404':
      return '404';
    case '/_error':
      return 'Error';
    case '/':
      return '';
    default:
      return '';
  }
};

const parseMeta = (router: NextRouter, tag?: Tag): Meta => {
  const { pathname, asPath } = router;
  const host = getHost();
  const pageName = parsePageName(pathname, tag);
  const pageUrl = `${host}${asPath}`;
  const imageUrl = tag !== undefined
    ? `${host}/api/ogimage?tag=${tag.slug.current}`
    : `${host}/api/ogimage`;

  return {
    pageName,
    imageUrl,
    pageUrl,
  };
};

const renderMeta = (settings: SiteSettings, meta: Meta): JSX.Element => {
  const { metaDescription, siteTitle } = settings;
  const { pageName, pageUrl, imageUrl } = meta;

  const metaTitle = pageName !== '' ? `${pageName} — ${siteTitle}` : siteTitle;

  return (
    <React.Fragment>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
    </React.Fragment>
  );
};

const SiteLayout = (props: Props): JSX.Element => {
  const {
    children,
    settings,
    tag,
    flexMain,
  } = props;
  const router = useRouter();
  const meta = parseMeta(router, tag);

  return (
    <React.Fragment>
      <Head>
        {renderMeta(settings, meta)}
      </Head>

      <div className={'container mx-auto lg:mx-0 px-2 lg:px-4 xl:pl-8 xl:pr-32 pt-4 sm:pt-6 xl:pt-10 min-h-screen flex flex-col justify-between'}>
        <Header {...meta} {...settings} />
        <main className={classNames('flex-grow', { flex: flexMain })}>
          { children }
        </main>

        <footer className="my-2">
          <p className="text-center text-xs sm:text-base">
            {getVersion()}
          </p>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default SiteLayout;
