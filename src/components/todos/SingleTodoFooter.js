//
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskActions } from "../../store/redux-store";

// COMPONENTS
import Button from "../../helpers/Button";
// import SingleTodoForm from "./SingleTodoForm";

import classes from "./SingleTodoFooter.module.css";

const SingleTodoFooter = (props) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const { tasks, newTaskText, allTasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const showTaskInputHandler = (e) => {
    e.preventDefault();
    props.showInput.set(true);
    setShowTaskInput(true);
  };

  const addNewTaskHandler = (e) => {
    e.preventDefault();
    let todoId;

    if (newTaskText.length > 0) {
      if (e.target.closest(".todo").id) {
        todoId = e.target.closest(".todo").id;
      }

      props.showInput.set(false);
      setShowTaskInput(false);
      let tasksLS = [];
      if (
        localStorage.getItem("tasks") &&
        JSON.parse(localStorage.getItem("tasks")).length > 0
      ) {
        tasksLS = JSON.parse(localStorage.getItem("tasks"));

        const newTask = {
          userId: +localStorage.getItem("userId"),
          title: newTaskText,
          id: allTasks[allTasks.length - 1].id + 1,
          completed: false,
          active: true,
        };

        if (todoId) newTask.todoTitle = todoId;

        tasksLS.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasksLS));

        dispatch(taskActions.updateAllTasks());
        dispatch(taskActions.setNewTaskText({ value: "" }));
      } else {
        tasksLS.push({
          userId: +localStorage.getItem("userId"),
          title: newTaskText,
          id: allTasks[allTasks.length - 1].id + 1,
          completed: false,
          active: true,
        });

        localStorage.setItem("tasks", JSON.stringify(tasksLS));
        dispatch(taskActions.updateAllTasks());
        dispatch(taskActions.setNewTaskText({ value: "" }));
      }
    }

    // if (newTaskText.length === 0) {
    //   dispatch(
    //     taskActions.setError({
    //       value: "Task need to contain 1-200 characters!",
    //     })
    //   );
    // }

    setShowTaskInput(false);
    props.showInput.set(false);
  };

  return (
    <div className={classes["single__todo-container"]}>
      {!showTaskInput && (
        <Button
          text="New Task"
          className={classes["single__todo-btn"]}
          onClick={showTaskInputHandler}
        />
      )}
      {showTaskInput && (
        <Button
          text={newTaskText.length > 0 ? "Add Task" : "Cancel"}
          className={classes["single__todo-btn"]}
          onClick={addNewTaskHandler}
        />
      )}
    </div>
  );
};

export default SingleTodoFooter;
