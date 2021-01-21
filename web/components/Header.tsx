import React from 'react';
import { SiteSettings } from '../../studio/models';
import MenuItem from './MenuItem';

const Header = (props: SiteSettings): JSX.Element => {
  const { siteTitle, menuItems } = props;

  return (
    <div>
      <a className="text-2xl sm:text-3xl inline-block -ml-1" href="/">{siteTitle}</a>
      <nav role="navigation" className="mt-2 sm:mt-3 mb-4 sm:mb-6 lg:mb-8">
        { menuItems.map((mi) => <MenuItem key={mi.title} {...mi} />)}
      </nav>
    </div>
  );
};

export default Header;
