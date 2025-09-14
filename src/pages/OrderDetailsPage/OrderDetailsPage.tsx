import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getOrderById } from "../../redux/orders/operations";
import { selectCart } from "../../redux/orders/selectors";
import css from "./OrderDetailsPage.module.css";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectCart);

  const order = orders.find((o) => o._id === orderId);

  useEffect(() => {
    if (!order && orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, order, orderId]);

  const date = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date not available";

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Order Details</h1>
        <div className={css.flowerDecoration}>🌸</div>
      </div>

      <div className={css.orderCard}>
        <div className={css.orderHeader}>
          <p className={css.orderId}>Order #{order?._id?.substring(0, 8)}</p>
          <span className={css.orderDate}>{date}</span>
        </div>

        <div className={css.section}>
          <h2 className={css.sectionTitle}>
            <span className={css.sectionIcon}>📦</span>
            Products
          </h2>
          <ul className={css.productsList}>
            {order?.products.map(({ flowerId, quantity, _id }) => (
              <li key={_id} className={css.productItem}>
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
              </li>
            ))}
          </ul>
        </div>

        <div className={css.section}>
          <h2 className={css.sectionTitle}>
            <span className={css.sectionIcon}>📋</span>
            Order Summary
          </h2>
          <div className={css.summaryGrid}>
            <div className={css.summaryItem}>
              <strong className={css.summaryLabel}>Total Price:</strong>
              <span className={css.summaryValue}>${order?.totalPrice}</span>
            </div>
            <div className={css.summaryItem}>
              <strong className={css.summaryLabel}>Delivery Address:</strong>
              <span className={css.summaryValue}>{order?.address}</span>
            </div>
            <div className={css.summaryItem}>
              <strong className={css.summaryLabel}>Order Status:</strong>
              <span className={`${css.status} ${css.statusCompleted}`}>
                Completed
              </span>
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <Link to="/" className={css.homeLink}>
            <svg className={css.homeIcon} viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
