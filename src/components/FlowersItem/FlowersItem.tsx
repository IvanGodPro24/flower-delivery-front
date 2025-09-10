import { Flower } from "../../redux/flowers/flowers.types";
import css from "./FlowersItem.module.css";

const FlowersItem = ({ name, price, image }: Flower) => {
  return (
    <div className={css.card}>
      <div className={css.imageContainer}>
        <img src={image} alt={name} className={css.img} />
        <div className={css.overlay}></div>
      </div>
      <div className={css.content}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.price}>${price}</p>
        <button className={css.addButton}>
          Add to Cart
          <svg className={css.cartIcon} viewBox="0 0 24 24">
            <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2zM1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FlowersItem;
