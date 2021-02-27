import React from 'react';
import classNames from 'classnames';
import { getWrapperStyles } from '../lib/utils';

const EmptyMessage = (): JSX.Element => (
  <div className={classNames('fixed inset-0 flex justify-center items-center', getWrapperStyles())}>
    <p className="text-xs sm:text-base sm:leading-normal">{'Empty. There are no posts to show...'}</p>
  </div>
);

export default EmptyMessage;
