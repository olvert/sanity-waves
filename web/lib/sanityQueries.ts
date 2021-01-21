import groq from 'groq';
import sanityClient from './sanityClient';
import { Post, SiteSettings } from '../../studio/models';

const POSTS_PER_PAGE = 5;

export const getPosts = (offset: number): Promise<Post[]> => {
  const start = offset;
  const end = offset + POSTS_PER_PAGE;

  const query = groq`
    *[_type == 'post'] {
      title,
      body[] {
        _type == 'video' => {
          _key,
          videoId
        },
        _type == 'image' => {
          _key,
          asset-> {
            url,
            metadata {
              dimensions {
                height,
                width
              }
            }
          }
        }
      },
      tags[]-> {
        title,
        slug
      },
      publishedAt,
      hideTitle,
      slug {
        current
      }
    } | order(_createdAt desc) [$start..$end]`;

  return sanityClient.fetch(query, {
    start,
    end,
  });
};

export const getSiteSettings = (): Promise<SiteSettings> => {
  const query = groq`
    *[_type == "siteSettings"] {
      menuItems[] {
        title,
        url
      },
      siteTitle
    } [0]`;

  return sanityClient.fetch(query);
};
