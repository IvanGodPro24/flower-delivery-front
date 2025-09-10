import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import css from "./Header.module.css";

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const petalVariants = {
    float: {
      y: [0, -10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.header
      className={css.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <div className={css.headerBackground}></div>

      <nav>
        <motion.ul
          className={css.list}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={itemVariants}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              <span className={css.linkText}>Shop</span>
              <motion.div
                className={css.linkHoverEffect}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.3 }}
              />
            </NavLink>
          </motion.li>

          <motion.div className={css.verticalLine} variants={itemVariants} />

          <motion.li variants={itemVariants}>
            <NavLink
              to="/shopping-cart"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              <span className={css.linkText}>Shopping Cart</span>
              <motion.div
                className={css.linkHoverEffect}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.3 }}
              />
            </NavLink>
          </motion.li>
        </motion.ul>
      </nav>

      <div className={css.petals}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={css.petal}
            variants={petalVariants}
            animate="float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
