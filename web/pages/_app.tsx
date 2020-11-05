import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

import '../styles/app.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
