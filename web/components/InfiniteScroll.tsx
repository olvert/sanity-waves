import React from 'react';
import { InView } from 'react-intersection-observer';

type Props = {
  children: React.ReactNode;
  isDisabled: boolean;
  loadMore: () => void;
  threshold?: number;
}

const InfiniteScroll = (props: Props): JSX.Element => {
  const {
    children,
    isDisabled,
    loadMore,
    threshold,
  } = props;

  const onChange = (inView: boolean) => {
    if (inView && !isDisabled) {
      loadMore();
    }
  };

  return (
    <div>
      { children }
      <InView
        as="div"
        onChange={onChange}
        rootMargin={threshold ? `0px 0px ${threshold}px 0px` : '0px'}
      >
      </InView>
    </div>
  );
};

export default InfiniteScroll;
