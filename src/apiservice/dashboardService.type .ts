export interface IURL {
  message?: string;
  data?: IUrlData[];
}

export interface IUrlData {
  id: number;
  name: string;
  description: string;
  url: string;
}
