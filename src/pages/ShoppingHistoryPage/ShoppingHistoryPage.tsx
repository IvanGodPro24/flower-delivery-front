import { useEffect } from "react";
import css from "./ShoppingHistoryPage.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getHistory } from "../../redux/orders/operations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectOrders } from "../../redux/orders/selectors";
import OrderHistoryItem from "../../components/OrderHistoryItem/OrderHistoryItem";

const ShoppingHistoryPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const orders = useAppSelector(selectOrders);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Order History</h1>
        <div className={css.flowerDecoration}>🌸</div>
      </div>

      {orders.length === 0 ? (
        <div className={css.emptyHistory}>
          <div className={css.emptyIcon}>📋</div>
          <h3 className={css.emptyTitle}>No orders yet</h3>
          <p className={css.emptyText}>
            Your order history will appear here after you make purchases.
          </p>
        </div>
      ) : (
        <div className={css.ordersList}>
          {orders.map((order) => (
            <OrderHistoryItem key={order._id} {...order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingHistoryPage;
