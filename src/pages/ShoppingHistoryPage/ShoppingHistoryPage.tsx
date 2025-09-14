import css from "./ShoppingHistoryPage.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectHistory } from "../../redux/orders/selectors";
import OrderHistoryItem from "../../components/OrderHistoryItem/OrderHistoryItem";
import ShoppingHistoryForm from "../../components/ShoppingHistoryForm/ShoppingHistoryForm";

const ShoppingHistoryPage = () => {
  const orders = useAppSelector(selectHistory);

  return (
    <div className={css.container}>
      <ShoppingHistoryForm />

      <div className={css.ordersList}>
        {orders.map((order) => (
          <OrderHistoryItem key={order._id} {...order} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingHistoryPage;
