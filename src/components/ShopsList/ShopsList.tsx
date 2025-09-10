import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllShops } from "../../redux/shops/operations";
import ShopsItem from "../ShopsItem/ShopsItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectShops } from "../../redux/shops/selectors";
import css from "./ShopsList.module.css";

const ShopsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllShops());
  }, [dispatch]);

  const shops = useAppSelector(selectShops);

  return (
    <ul className={css.list}>
      {shops.map((shop) => (
        <li className={css.item} key={shop._id}>
          <ShopsItem {...shop} />
        </li>
      ))}
    </ul>
  );
};

export default ShopsList;
