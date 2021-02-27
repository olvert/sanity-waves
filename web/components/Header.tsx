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
      <div className="bg-white relative z-30 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl sm:text-4xl sm:leading-normal inline-block">
            {pageTitle}
          </a>
        </Link>
        <button
          className="pl-12"
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={() => setIsHoveringButton(false)}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsHoveringButton(!isOpen);
            setIsHoveringNav(!isOpen);
          }}
        >
          <MenuIcon className="w-10 h-10 mt-2" />
        </button>
      </div>
      <nav
        role="navigation"
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
        className={classNames(
          'absolute inset-x-0 z-20 text-right pb-2 bg-white transform transition-transform duration-100 ease-out delay-100',
          { '-translate-y-full': showNav() === false },
          { '-translate-y-0.5': showNav() === true },
        )}
      >
        { menuItems.map((mi) => <MenuItem key={mi.title} {...mi} />)}
      </nav>
    </div>
  );
};

export default Header;
