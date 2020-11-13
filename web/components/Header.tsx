import React from 'react';
import { useSiteSettingsQuery } from '../generated/graphql';

const Header = (): JSX.Element => {
  const { loading, data } = useSiteSettingsQuery();
  const settings = data.allSiteSettings[0];
  const { siteTitle } = settings;

  return (
    <div>
      <a className="text-2xl sm:text-3xl inline-block -ml-1" href="/">{siteTitle}</a>
      <nav role="navigation" className="mt-2 sm:mt-3 mb-4 sm:mb-6 lg:mb-8">
        <a className="text-sm sm:text-base text-grayish hover:text-blackish mr-1 sm:mr-2" href="https://waves.olle.io/">Home</a>
      </nav>
    </div>
  );
};

export default Header;
