import React from 'react';
import Link from 'next/link';
import { MenuItem as Props } from '../lib/models';

const MenuItem = (props: Props): JSX.Element => {
  const { title, url } = props;

  return (
    <Link href={url}>
      <a className="text-sm sm:text-base text-grayish hover:text-blackish mr-2 sm:mr-3">
        {title}
      </a>
    </Link>
  );
};

export default MenuItem;
