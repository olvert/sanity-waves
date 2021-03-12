/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class CustomizedDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full bg-white font-apfel-grotezk text-blackish text-left antialiased">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomizedDocument;
