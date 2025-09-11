import { useState } from "react";
import css from "./ShoppingCartItem.module.css";
import { ShoppingCartItemProps } from "./ShoppingCartItem.types";
import clsx from "clsx";
import ExtraLoader from "../ExtraLoader/ExtraLoader";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "sonner";
import {
  deleteOrder,
  deleteOrderItem,
  updateOrderItem,
} from "../../redux/orders/operations";

const ShoppingCartItem = ({
  _id,
  products,
  totalPrice,
}: ShoppingCartItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteOrder(_id)).unwrap();

      toast.success("Order delete successfully!");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteItem = async (flowerId: string, name: string) => {
    try {
      await dispatch(deleteOrderItem({ orderId: _id, flowerId })).unwrap();
      toast.success(`${name} removed from cart`);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleQuantityChange = async (
    flowerId: string,
    value: number,
    name: string
  ) => {
    if (value < 1) return;

    try {
      await dispatch(
        updateOrderItem({ orderId: _id, flowerId, quantity: value })
      ).unwrap();
      toast.success(`${name} quantity updated`);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className={clsx(css.container, isDeleting && css.deleting)}>
      <div className={css.productsList}>
        {products.map(
          ({
            flowerId: { _id: flowerId, image, name },
            quantity,
            _id: productId,
          }) => (
            <div key={productId} className={css.productItem}>
              <div className={css.imageContainer}>
                <img src={image} alt={name} className={css.img} />
                <div className={css.overlay}></div>
              </div>
              <div className={css.info}>
                <h3 className={css.name}>{name}</h3>
                <div className={css.quantityContainer}>
                  <span className={css.quantityLabel}>Quantity:</span>
                  <input
                    type="number"
                    value={quantity}
                    className={css.quantityInput}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        flowerId,
                        Number(e.target.value),
                        name
                      )
                    }
                  />
                </div>
              </div>
              <button
                className={css.deleteBtn}
                onClick={() => handleDeleteItem(flowerId, name)}
                disabled={isDeleting}
                aria-label={`Remove ${name} from cart`}
              >
                <svg className={css.deleteIcon} viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          )
        )}
      </div>

      <div className={css.footer}>
        <div className={css.totalContainer}>
          <div className={css.totalLabel}>Order Total:</div>
          <div className={css.totalPrice}>${totalPrice}</div>
        </div>
        <button
          className={css.deleteOrderBtn}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <ExtraLoader /> : "Remove Order"}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
