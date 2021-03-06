import React, { useEffect } from 'react';
import AOS, { AosOptions } from 'aos';
import { useSWRInfinite } from 'swr';

import 'aos/dist/aos.css';

import Post from './Post';
import SiteLayout from './SiteLayout';
import { SiteSettings, Post as PostModel, Tag } from '../lib/models';
import PageMessage from './PageMessage';
import { getPosts, getTagPosts, PAGE_SIZE } from '../lib/sanityQueries';
import InfiniteScroll from './InfiniteScroll';

type Props = {
  settings: SiteSettings;
  initialPosts: PostModel[];
  tag?: Tag;
}

const aosOptions: AosOptions = {
  duration: 300,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
};

const PostPage = (props: Props): JSX.Element => {
  const { initialPosts, tag, ...rest } = props;

  const baseKey = tag === undefined ? 'posts:index' : `posts:${tag.slug.current}`;
  const getKey = (index, prevData) => (prevData && !prevData.length ? null : [baseKey, index]);

  const fetcher = tag === undefined
    ? (key, index) => getPosts(index)
    : (key, index) => getTagPosts(tag.slug.current, index);

  const { data, size, setSize } = useSWRInfinite<PostModel[]>(
    getKey,
    fetcher,
    { initialData: [initialPosts] },
  );

  const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => AOS.init(aosOptions), []);

  if (data && data.length === 0) {
    return (
      <SiteLayout tag={tag} {...rest}>
        <PageMessage message={'Empty. There are no posts to show.'} />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout tag={tag} {...rest}>
      <InfiniteScroll
        isDisabled={isLoadingMore || isReachingEnd}
        loadMore={() => setSize(size + 1)}
        threshold={600}
      >
        { data && data.flat(1).map((post) => <Post key={post.slug ? post.slug.current : ''} {...post} />) }
      </InfiniteScroll>
    </SiteLayout>
  );
};

export default PostPage;
