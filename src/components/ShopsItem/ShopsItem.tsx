import { Shop } from "../../redux/shops/shops.types";

const ShopsItem = ({ name }: Shop) => {
  return (
    <>
      <p>{name}</p>
    </>
  );
};

export default ShopsItem;
