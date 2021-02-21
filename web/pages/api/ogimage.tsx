import fetch from 'node-fetch';

import type { NextApiRequest, NextApiResponse } from 'next'
import { getLatestPostForOgImage } from '../../lib/sanityQueries'
import { getOgImageUrlFromPost } from '../../lib/utils';

type Data = any;

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const post = await getLatestPostForOgImage();
  const url = getOgImageUrlFromPost(post);

  const imageResponse = await fetch(url);
  const imageContentType = imageResponse.headers.get('content-type');
  const imageBuffer = await imageResponse.buffer();

  res.setHeader('content-type', imageContentType);
  
  res.status(200).send(imageBuffer);
}