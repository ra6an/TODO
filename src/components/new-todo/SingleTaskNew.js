//
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/redux-store";

import classes from "./SingleTaskNew.module.css";

const SingleTaskNew = (props) => {
  const dispatch = useDispatch();

  const removeTaskHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.removeTodoFromNewTODO({ value: props.text }));
  };

  return (
    <li className={classes["single__task-new"]} key={Math.random()}>
      <span className={classes["single__task-text"]}>{props.text}</span>
      <RiCloseFill
        className={classes["single__task-icon-del"]}
        onClick={removeTaskHandler}
      />
    </li>
  );
};

export default SingleTaskNew;
