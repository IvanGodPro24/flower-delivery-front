import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllFlowers } from "../../redux/flowers/operations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFlowers } from "../../redux/flowers/selectors";
import css from "./FlowersList.module.css";
import FlowersItem from "../FlowersItem/FlowersItem";

const FlowersList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFlowers());
  }, [dispatch]);

  const flowers = useAppSelector(selectFlowers);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Beautiful Flowers</h2>
      <ul className={css.list}>
        {flowers.map((flower) => (
          <li className={css.item} key={flower._id}>
            <FlowersItem {...flower} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlowersList;
