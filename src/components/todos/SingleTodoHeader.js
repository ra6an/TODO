//
import { FiMenu } from "react-icons/fi";

import classes from "./SingleTodoHeader.module.css";

const SingleTodoHeader = (props) => {
  const toggleShowTaskHandler = (e) => {
    e.preventDefault();

    props.showTasks.set(!props.showTasks.show);
  };
  return (
    <div className={classes["single__todo-header"]}>
      <FiMenu
        onClick={toggleShowTaskHandler}
        className={classes["single__todo-icon"]}
      />
      <h2>{props.todoTitle}</h2>
    </div>
  );
};

export default SingleTodoHeader;
