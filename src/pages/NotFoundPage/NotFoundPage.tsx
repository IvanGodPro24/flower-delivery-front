import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useState, useEffect } from "react";
import clsx from "clsx";

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={css.container}>
      <div
        className={css.backgroundOrb}
        style={{
          left: `${mousePosition.x / 20}px`,
          top: `${mousePosition.y / 20}px`,
        }}
      ></div>

      <div
        className={css.backgroundOrb2}
        style={{
          right: `${mousePosition.x / 25}px`,
          bottom: `${mousePosition.y / 25}px`,
        }}
      ></div>

      <main className={css.content}>
        <div className={css.numberGroup}>
          <span className={css.number}>4</span>
          <div className={css.flower}></div>
          <span className={css.number}>4</span>
        </div>

        <h1 className={css.title}>Page Not Found</h1>

        <p className={css.message}>
          Oops! The page you're looking for seems to have bloomed away.
        </p>

        <Link
          to="/"
          className={clsx(css.homeButton, isHovered && css.hovered)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Return to Home
          <svg className={css.arrow} viewBox="0 0 24 24">
            <path d="M4 12h16m-7-7l7 7-7 7" />
          </svg>
        </Link>
      </main>

      <div className={css.petals}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={css.petal}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
