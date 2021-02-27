import React from 'react';
import Link from 'next/link';
import { MenuItem as Props } from '../lib/models';

const MenuItem = (props: Props): JSX.Element => {
  const { title, url } = props;

  return (
    <Link href={url}>
      <a className="text-3xl leading-normal border-b-2 border-transparent hover:border-blackish text-blackish mr-2 sm:mr-3">
        {title}
      </a>
    </Link>
  );
};

export default MenuItem;
