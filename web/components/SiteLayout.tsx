import Head from 'next/head';
import React from 'react';
import Header from './Header';

type Props = {
  children: React.ReactNode,
}

const SiteLayout = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto lg:mx-0 px-2 lg:px-4 xl:pl-8 pt-4 sm:pt-6 xl:pt-10 xl:pr-32">
        <Header />
        { children }
      </main>

      <footer>
      </footer>
    </div>
  );
};

export default SiteLayout;
