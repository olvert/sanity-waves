import React from 'react';
import { MenuItem as Props } from '../generated/graphql';

const MenuItem = (props: Props): JSX.Element => {
  const { title, url } = props;

  return (
    <a
      href={url}
      className="text-sm sm:text-base text-grayish hover:text-blackish mr-2 sm:mr-3">
        {title}
    </a>
  );
};

export default MenuItem;
