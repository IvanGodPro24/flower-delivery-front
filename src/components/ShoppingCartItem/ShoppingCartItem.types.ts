import { Products } from "../../redux/orders/orders.types";

export type ShoppingCartItemProps = {
  _id: string;
  products: Products[];
  totalPrice: number;
};
