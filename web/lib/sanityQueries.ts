import groq from 'groq';
import sanityClient from './sanityClient';
import { Post, SiteSettings } from '../../studio/models';

export const getPosts = (): Promise<Post[]> => {
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
    } [0...10]`;

  return sanityClient.fetch(query);
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
