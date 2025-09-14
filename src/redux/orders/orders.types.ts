export type Order = {
  _id: string;
  products: Products[];
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  isFinalized: boolean;
  createdAt?: string;
};

export type Products = {
  _id: string;
  flowerId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
};

export type OrderState = {
  items: Order[];
  loading: boolean;
  error: string | null;
};

export type OrderItem = {
  orderId: string;
  flowerId: string;
};

export type UpdateOrderItem = {
  orderId: string;
  flowerId: string;
  quantity: number;
};

export type FinalizeOrder = {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type GetHistory = {
  email?: string;
  phone?: string;
  orderId?: string;
};
