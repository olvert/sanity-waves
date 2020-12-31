import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

type Props = {
  children: React.ReactNode;
  loadMore: () => Promise<unknown>
}

const shouldLoad = (div: HTMLDivElement): boolean => {
  const divBottomY = div.scrollHeight + div.offsetTop;
  const scrollY = window.innerHeight + window.scrollY;

  return scrollY >= divBottomY;
};

const InfiniteScroll = (props: Props): JSX.Element => {
  const { children, loadMore } = props;
  const ref = useRef<HTMLDivElement>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollHandler = () => {
    if (isLoading) { return; }

    if (shouldLoad(ref.current)) {
      setIsLoading(true);
      loadMore().then(() => setIsLoading(false));
    }
  };

  const throttledScrollHandler = _.throttle(scrollHandler, 400);

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    throttledScrollHandler();

    return () => window.removeEventListener('scroll', throttledScrollHandler);
  });

  return (
    <div ref={ref}>
      { children }
    </div>
  );
};

export default InfiniteScroll;
