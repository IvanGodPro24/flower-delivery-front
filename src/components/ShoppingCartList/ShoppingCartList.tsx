import { useEffect } from "react";
import css from "./ShoppingCartList.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCart } from "../../redux/orders/operations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectCart, selectLoading } from "../../redux/orders/selectors";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import ExtraLoader from "../ExtraLoader/ExtraLoader";

const ShoppingCartList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const orders = useAppSelector(selectCart);

  const loading = useAppSelector(selectLoading);

  if (loading) return <ExtraLoader />;

  return (
    <div className={css.container}>
      {orders.length === 0 ? (
        <div className={css.emptyCart}>
          <div className={css.emptyIcon}>🌸</div>
          <h3 className={css.emptyTitle}>Your cart is empty</h3>
          <p className={css.emptyText}>
            Add some beautiful flowers to your cart!
          </p>
        </div>
      ) : (
        <ul className={css.list}>
          {orders.map((order) => (
            <li className={css.item} key={order._id}>
              <ShoppingCartItem {...order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCartList;
