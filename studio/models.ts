import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
};

export interface Post extends SanityDocument {
  _type: 'post';
  title?: string;
  hideTitle?: boolean;
  slug?: { _type: 'slug'; current: string };
  tags?: Array<Tag>;
  publishedAt?: string;
  body?: PostContent;
}

export interface Tag extends SanityDocument {
  _type: 'tag';
  title?: string;
  slug?: { _type: 'slug'; current: string };
}

export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  siteTitle?: string;
  playlistUrl?: string;
  menuItems?: Array<MenuItem>;
  publishedAt?: string;
}

export type Video = {
  _type: 'video';
  videoId?: string;
};

export type PostContent = Array<
  | SanityKeyed<Image>
  | SanityKeyed<Video>
>;

export type MenuItem = {
  _type: 'menuItem';
  title?: string;
  url?: string;
};

export type Documents = Post | Tag | SiteSettings;

export type Image = {
  _type: 'image'
  asset: {
    url,
    metadata: {
      dimensions: {
        width: number,
        height: number,
      }
    }
  }
}
