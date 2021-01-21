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
} from "sanity-codegen";

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

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Hide title — `boolean`
   *
   *
   */
  hideTitle?: boolean;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyedReference<Tag>>;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `postContent`
   *
   *
   */
  body?: PostContent;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Site Settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";

  /**
   * Site title — `string`
   *
   *
   */
  siteTitle?: string;

  /**
   * Menu Items — `array`
   *
   *
   */
  menuItems?: Array<SanityKeyed<MenuItem>>;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;
}

export type Video = {
  _type: "video";
  /**
   * Video Id — `text`
   *
   *
   */
  videoId?: string;
};

export type PostContent = Array<
  | SanityKeyed<{
      _type: "image";
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyed<Video>
>;

export type MenuItem = {
  _type: "menuItem";
  /**
   * Title — `text`
   *
   *
   */
  title?: string;

  /**
   * Url — `text`
   *
   *
   */
  url?: string;
};

export type Documents = Post | Tag | SiteSettings;
