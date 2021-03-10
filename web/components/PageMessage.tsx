import React from 'react';

type Props = {
  message: string;
}

const PageMessage = (props: Props): JSX.Element => {
  const { message } = props;
  return (
    <div className="flex flex-grow justify-center items-center">
      <p className="text-xs sm:text-base sm:leading-normal">{message}</p>
    </div>
  );
};

export default PageMessage;
