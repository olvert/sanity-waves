import React, { SVGProps } from 'react';

const MenuIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M15 6H1v1h14V6zm0 3H1v1h14V9z"></path>
  </svg>
);

export default MenuIcon;
