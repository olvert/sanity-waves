import React from 'react';
import { AppProps } from 'next/app';

import '../styles/app.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => <Component {...pageProps} />;

export default App;
