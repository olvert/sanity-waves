import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { SiteSettings } from '../lib/models';
import MenuItem from './MenuItem';
import MenuIcon from './MenuIcon';

type Props = SiteSettings & {
  pageName: string;
}

const Header = (props: Props): JSX.Element => {
  const { siteTitle, menuItems, pageName } = props;
  const pageTitle = pageName !== '' ? `${siteTitle} — ${pageName}` : siteTitle;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      <div className="bg-white relative z-30 flex justify-between items-center py-1">
        <Link href="/">
          <a className="text-2xl sm:text-4xl sm:leading-normal inline-block flex-auto overflow-ellipsis overflow-hidden whitespace-nowrap">
            {pageTitle}
          </a>
        </Link>
        <button
          className="focus:outline-none pl-6 sm:pl-12 flex-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="toggle menu"
        >
          <MenuIcon className="w-8 h-8 sm:w-10 sm:h-10 -mb-1 sm:-mb-2" />
        </button>
      </div>
      <nav
        role="navigation"
        className={classNames(
          'absolute inset-x-0 z-20 text-right pb-2 bg-white flex flex-col items-end sm:block',
          { invisible: isOpen === false },
          { visible: isOpen === true },
        )}
      >
        { menuItems.map((mi) => <MenuItem key={mi.title} {...mi} />)}
      </nav>
    </header>
  );
};

export default Header;
