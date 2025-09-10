export type Flower = {
  name: string;
  price: number;
  image: string;
  shopId: {
    name: string;
  };
};

export type FlowersState = {
  items: Flower[];
  loading: boolean;
  error: string | null;
};
