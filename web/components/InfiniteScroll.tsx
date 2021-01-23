import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

type Props = {
  children: React.ReactNode;
  loadMore: () => Promise<boolean>;
  threshold?: number;
}

enum LoadingState {
  Idle,
  Loading,
  Exhausted
}

const shouldLoad = (div: HTMLDivElement, threshold: number): boolean => {
  const bottomY = div.scrollHeight + div.offsetTop - threshold;
  const scrollY = window.innerHeight + window.scrollY;

  return scrollY >= bottomY;
};

const InfiniteScroll = (props: Props): JSX.Element => {
  const { children, loadMore, threshold = 0 } = props;
  const ref = useRef<HTMLDivElement>();
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Idle);

  const scrollHandler = () => {
    if (loadingState !== LoadingState.Idle) { return; }

    if (shouldLoad(ref.current, threshold)) {
      setLoadingState(LoadingState.Loading);
      loadMore().then((isExhausted) => {
        const nextLoadingState = isExhausted ? LoadingState.Exhausted : LoadingState.Idle;
        setLoadingState(nextLoadingState);
      });
    }
  };

  const throttledScrollHandler = _.throttle(scrollHandler, 400);

  const addListener = () => window.addEventListener('scroll', throttledScrollHandler, { passive: true });
  const removeListener = () => window.removeEventListener('scroll', throttledScrollHandler);

  useEffect(() => {
    switch (loadingState) {
      case LoadingState.Exhausted:
        removeListener();
        break;
      default:
        addListener();
        break;
    }

    throttledScrollHandler();

    return removeListener;
  });

  return (
    <div ref={ref}>
      { children }
    </div>
  );
};

export default InfiniteScroll;
