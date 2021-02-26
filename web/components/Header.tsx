import React from 'react';
import Link from 'next/link';
import { SiteSettings } from '../lib/models';
import MenuItem from './MenuItem';

type Props = SiteSettings & {
  pageName: string;
}

const Header = (props: Props): JSX.Element => {
  const { siteTitle, menuItems, pageName } = props;
  const pageTitle = pageName !== '' ? `${siteTitle} — ${pageName}` : siteTitle;

  return (
    <div>
      <Link href="/">
        <a className="text-2xl sm:text-4xl sm:leading-normal inline-block">
          {pageTitle}
        </a>
      </Link>
      <nav role="navigation" className="mt-2 sm:mt-3 mb-4 sm:mb-6 lg:mb-8">
        { menuItems.map((mi) => <MenuItem key={mi.title} {...mi} />)}
      </nav>
    </div>
  );
};

export default Header;
