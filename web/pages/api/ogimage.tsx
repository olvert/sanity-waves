import fetch from 'node-fetch';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getLatestPostForOgImage, getLatestTagPostForOgImage } from '../../lib/sanityQueries';
import { getOgImageUrlFromPost } from '../../lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse<Buffer>): Promise<void> => {
  const { query: { tag } } = req;

  const post = tag !== undefined
    ? await getLatestTagPostForOgImage(tag as string)
    : await getLatestPostForOgImage();

  const url = getOgImageUrlFromPost(post);

  const imageResponse = await fetch(url);
  const imageContentType = imageResponse.headers.get('content-type');
  const imageBuffer = await imageResponse.buffer();

  res.setHeader('content-type', imageContentType);

  res.status(200).send(imageBuffer);
};
