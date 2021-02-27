import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import classNames from 'classnames';
import { SiteSettings, Tag } from '../lib/models';
import { getHost, getVersion, getWrapperStyles } from '../lib/utils';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  settings: SiteSettings;
  tag?: Tag;
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
      return tag.title;
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
  const { children, settings, tag } = props;
  const router = useRouter();
  const meta = parseMeta(router, tag);

  return (
    <React.Fragment>
      <Head>
        {renderMeta(settings, meta)}
      </Head>

      <div className={classNames('min-h-screen flex flex-col justify-between', getWrapperStyles())}>
        <main className="pt-4 sm:pt-6 xl:pt-10">
          <Header {...meta} {...settings} />
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
