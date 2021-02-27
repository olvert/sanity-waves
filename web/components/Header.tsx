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

  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const showNav = () => isHoveringNav || isHoveringButton || isOpen;

  return (
    <div className="sticky top-0 z-30">
      <div className="bg-white relative z-30 flex justify-between items-center py-1">
        <Link href="/">
          <a className="text-2xl sm:text-4xl sm:leading-normal inline-block flex-auto overflow-ellipsis overflow-hidden whitespace-nowrap">
            {pageTitle}
          </a>
        </Link>
        <button
          className="focus:outline-none pl-6 sm:pl-12 flex-none"
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={() => setIsHoveringButton(false)}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsHoveringButton(!isOpen);
            setIsHoveringNav(!isOpen);
          }}
        >
          <MenuIcon className="w-8 h-8 sm:w-10 sm:h-10 -mb-1 sm:-mb-2" />
        </button>
      </div>
      <nav
        role="navigation"
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
        className={classNames(
          'absolute inset-x-0 z-20 text-right pb-2 bg-white transform transition-transform duration-100 ease-out delay-100 flex flex-col items-end sm:block',
          { '-translate-y-full': showNav() === false },
          { '-translate-y-0.5': showNav() === true },
        )}
      >
        { menuItems.map((mi) => <MenuItem key={mi.title} {...mi} />)}
      </nav>
      <div className="w-full h-32 bg-white absolute top-0 transform -translate-y-full z-20" />
    </div>
  );
};

export default Header;
