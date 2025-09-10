import { Shop } from "../../redux/shops/shops.types";
import css from "./ShopsItem.module.css";

const ShopsItem = ({ name }: Shop) => {
  return (
    <div className={css.card}>
      <div className={css.flowerIcon}>
        <div className={css.petal}></div>
        <div className={css.petal}></div>
        <div className={css.petal}></div>
        <div className={css.petal}></div>
        <div className={css.center}></div>
      </div>
      <p className={css.name}>{name}</p>
    </div>
  );
};

export default ShopsItem;
