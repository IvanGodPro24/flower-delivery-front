import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  return (
      <header className={css.header}>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink to="/shops">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/shopping-cart">Shopping Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
