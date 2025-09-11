import ShoppingCartForm from "../../components/ShoppingCartForm/ShoppingCartForm";
import ShoppingCartList from "../../components/ShoppingCartList/ShoppingCartList";
import css from "./ShoppingCartPage.module.css";

const ShoppingCartPage = () => {
  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <ShoppingCartForm />
      </div>
      <div className={css.cartContainer}>
        <h1 className={css.pageTitle}>Your Shopping Cart</h1>
        <ShoppingCartList />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
