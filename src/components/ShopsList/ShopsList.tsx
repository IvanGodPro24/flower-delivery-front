import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllShops } from "../../redux/shops/operations";
import ShopsItem from "../ShopsItem/ShopsItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectLoading, selectShops } from "../../redux/shops/selectors";
import css from "./ShopsList.module.css";
import ExtraLoader from "../ExtraLoader/ExtraLoader";

const ShopsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllShops());
  }, [dispatch]);

  const shops = useAppSelector(selectShops);

  const loading = useAppSelector(selectLoading);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Our Flower Shops</h2>
      {loading ? (
        <ExtraLoader />
      ) : (
        <ul className={css.list}>
          {shops.map((shop) => (
            <li className={css.item} key={shop._id}>
              <ShopsItem {...shop} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopsList;
