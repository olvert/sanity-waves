import React from 'react';
import classNames from 'classnames';
import { getWrapperStyles } from '../lib/utils';

type Props = {
  message: string;
}

const PageMessage = (props: Props): JSX.Element => {
  const { message } = props;
  return (
    <div className={classNames('fixed inset-0 flex justify-center items-center', getWrapperStyles())}>
      <p className="text-xs sm:text-base sm:leading-normal">{message}</p>
    </div>
  );
};

export default PageMessage;
