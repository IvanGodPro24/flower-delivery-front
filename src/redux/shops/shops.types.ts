export type Shop = {
  _id: string;
  name: string;
};

export type ShopState = {
  items: Shop[];
  loading: boolean;
  error?: string | null;
};
