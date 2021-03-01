import groq from 'groq';
import sanityClient from './sanityClient';
import { Post, SiteSettings, Tag } from './models';

const POSTS_PER_PAGE = 10;

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
    } | order(_createdAt desc) [$start...$end]`;

  return sanityClient.fetch(query, {
    start,
    end,
  });
};

export const getTagPosts = (slug: string, offset: number): Promise<Post[]> => {
  const start = offset;
  const end = offset + POSTS_PER_PAGE;

  const query = groq`
    *[_type == 'post' && $slug in tags[]->slug.current] {
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
    } | order(_createdAt desc) [$start...$end]`;

  return sanityClient.fetch(query, {
    slug,
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
      siteTitle,
      playlistUrl,
      metaDescription
    } [0]`;

  return sanityClient.fetch(query);
};

export const getTag = (slug: string): Promise<Tag> => {
  const query = groq`
    *[_type == 'tag' && slug.current == $slug] {
      title,
      slug {
        current
      }
    }[0]`;

  return sanityClient.fetch(query, { slug });
};

export const getTags = (): Promise<Tag[]> => {
  const query = groq`
    *[_type == 'tag'] | order(title) {
      title,
      slug {
        current      
      }
    }`;

  return sanityClient.fetch(query);
};

export const getLatestPostForOgImage = (): Promise<Post> => {
  const query = groq`
    *[_type == 'post'] {
      body[] {
        _type == 'video' => {
          videoId
        },
        _type == 'image' => {
          asset-> {
            url,
          }
        }
      }
    } | order(_createdAt desc) [0]`;

  return sanityClient.fetch(query, {});
};

export const getLatestTagPostForOgImage = (slug: string): Promise<Post> => {
  const query = groq`
    *[_type == 'post' && $slug in tags[]->slug.current] {
      body[] {
        _type == 'video' => {
          videoId
        },
        _type == 'image' => {
          asset-> {
            url,
          }
        }
      }
    } | order(_createdAt desc) [0]`;

  return sanityClient.fetch(query, { slug });
};
