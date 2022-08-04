//
import { useEffect, useState } from "react";

// COMPONENTS
import SingleTodoHeader from "./SingleTodoHeader";
import SingleTodoList from "./SingleTodoList";
import SingleTodoFooter from "./SingleTodoFooter";

import classes from "./SingleTodo.module.css";

const SingleTodo = (props) => {
  const [showTasks, setShowTasks] = useState(false);
  const [showInput, setShowInput] = useState(false);

  return (
    <div
      className={`${classes["single__todo-container"]} ${"todo"}`}
      id={props.data.todoTitle}
    >
      <SingleTodoHeader
        todoTitle={props.data.todoTitle}
        showTasks={{ show: showTasks, set: setShowTasks }}
      />
      {showTasks && (
        <SingleTodoList showInput={showInput} data={props.data.tasks} />
      )}
      {showTasks && (
        <SingleTodoFooter showInput={{ show: showInput, set: setShowInput }} />
      )}
    </div>
  );
};

export default SingleTodo;
