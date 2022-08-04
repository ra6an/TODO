//
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import SingleTask from "./SingleTask";
import { taskActions } from "../../store/redux-store";

import classes from "./SingleTodoList.module.css";

const SingleTodoList = (props) => {
  const [showIcon, setShowIcon] = useState(false);
  const { newTaskText } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const newTaskHandler = (e) => {
    dispatch(taskActions.setNewTaskText({ value: e.target.value }));
  };

  const tasks = props.data.map((task) =>
    task.active === false ? (
      ""
    ) : (
      <SingleTask
        id={task.id}
        key={task.id}
        data={task}
        setShowIcon={setShowIcon}
        showIcon={showIcon}
      />
    )
  );

  return (
    <ul className={classes["single__todo-list"]}>
      {tasks}
      {props.showInput && (
        <textarea
          onChange={newTaskHandler}
          className={classes["single__todo-textarea"]}
          placeholder="Enter new task"
          spellCheck={false}
          value={newTaskText}
        ></textarea>
      )}
    </ul>
  );
};

export default SingleTodoList;
