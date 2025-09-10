import { Order } from "../orders/orders.types";
import { Shop } from "../shops/shops.types";

export type Flower = {
  _id: string;
  name: string;
  price: number;
  image: string;
  shopId: {
    name: string;
  };
};

export type State = {
  items: Flower[] | Shop[] | Order[];
  loading: boolean;
  error: string | null;
};
