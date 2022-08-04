//
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import SingleTaskNew from "./SingleTaskNew";

import classes from "./AddedTasks.module.css";

const AddedTasks = (props) => {
  const { newTODO } = useSelector((state) => state.task);

  const tasks = newTODO.tasks.map((task) => (
    <SingleTaskNew key={Math.random()} text={task} />
  ));

  return <ul className={classes["new__todo-added-tasks"]}>{tasks}</ul>;
};

export default AddedTasks;
