export type Link = {
  id: number;
  link_url: string;
  link_label: string;
  order: number;
  created_at: string;
  updated_at: string;
  start_date: string | null;
  end_date: string | null;
};

export type BannerUpdate = {
  id: number;
  title: string;
  content: string;
  link_url: string | null;
  link_label: string | null;
  created_at: string;
  updated_at: string;
  start_date: string | null;
  end_date: string | null;
};

export type LinkStats = {
  id: number;
  link_label: string;
  link_url: string;
  click_count: number;
  last_clicked: string | null;
};

export type Event = {
  id: number;
  type: "meeting" | "event";
  name: string;
  description: string;
  start_date: string;
  end_date: string | null;
  slug: string;
  location: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "svg";

export type Image = {
  path: string;
  alt: string;
  formats: ImageFormat[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  year: string;
  image: Image;
  slug: string;
  current?: boolean;
};
