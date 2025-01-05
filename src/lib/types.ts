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
