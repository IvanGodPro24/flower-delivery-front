import css from "./OrderHistoryItem.module.css";
import { ShoppingCartItemProps } from "../ShoppingCartItem/ShoppingCartItem.types";

const OrderHistoryItem = ({
  _id,
  products,
  totalPrice,
  createdAt,
}: ShoppingCartItemProps & { createdAt?: string }) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date not available";

  return (
    <div className={css.container}>
      <div className={css.orderHeader}>
        <div className={css.orderInfo}>
          <span className={css.orderId}>Order #{_id?.substring(0, 8)}</span>
          <span className={css.orderDate}>{formattedDate}</span>
        </div>
        <div className={css.orderTotal}>
          <span className={css.totalLabel}>Total:</span>
          <span className={css.totalPrice}>${totalPrice}</span>
        </div>
      </div>

      <div className={css.productsSection}>
        <h3 className={css.productsTitle}>Items</h3>
        <div className={css.productsList}>
          {products.map(({ flowerId, quantity, _id: productId }) => (
            <div key={productId} className={css.productItem}>
              <div className={css.imageContainer}>
                <img
                  src={flowerId.image}
                  alt={flowerId.name}
                  className={css.productImage}
                />
                <div className={css.overlay}></div>
              </div>
              <div className={css.productInfo}>
                <span className={css.productName}>{flowerId.name}</span>
                <div className={css.productDetails}>
                  <span className={css.productQuantity}>Qty: {quantity}</span>
                  <span className={css.productPrice}>${flowerId.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
