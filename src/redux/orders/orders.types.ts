export type Order = {
  _id: string;
  products: Products[];
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
};

export type Products = {
  flowerId: {
    name: string;
    price: number;
  };
  quantity: number;
};

export type OrderState = {
  items: Order[];
  loading: boolean;
  error: string | null;
};
