import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllFlowers } from "../../redux/flowers/operations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFlowers, selectLoading } from "../../redux/flowers/selectors";
import css from "./FlowersList.module.css";
import FlowersItem from "../FlowersItem/FlowersItem";
import Loader from "../Loader/Loader";

const FlowersList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFlowers());
  }, [dispatch]);

  const flowers = useAppSelector(selectFlowers);

  const loading = useAppSelector(selectLoading);

  if (loading) return <Loader />;

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
