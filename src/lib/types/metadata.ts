export interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
  organization: {
    name: string;
    url: string;
    logo: string;
  };
}

export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  modifiedAt?: string;
  canonicalUrl?: string;
  authors?: Array<{
    name: string;
    url?: string;
  }>;
}
