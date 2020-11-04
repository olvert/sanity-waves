import React from 'react';
import NextImage from 'next/image';
import { Image } from '../generated/graphql';

const ImageContent = (props: Image): JSX.Element => {
  const { url, metadata } = props.asset;
  const { width, height } = metadata.dimensions;

  return <NextImage
    src={url}
    width={width}
    height={height}
  />;
};

export default ImageContent;
