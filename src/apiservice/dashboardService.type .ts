export interface IURL {
  status: number;
  meta: Meta;
  data: IURLData[];
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface IURLData {
  id: number;
  user_id: number | null;
  name: string;
  description: string | null;
  website_url: string;
  shortened_url: string;
  created_at: string;
  updated_at: string;
}
