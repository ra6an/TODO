//
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/redux-store";
import { RiAddFill } from "react-icons/ri";

import classes from "./AddNewTask.module.css";

const AddNewTask = (props) => {
  const dispatch = useDispatch();
  const { newTodoTask } = useSelector((state) => state.task);

  const addNewTaskHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.setTODOTask({ value: newTodoTask }));
    dispatch(taskActions.setNewTodoTask({ value: "" }));
  };

  const addTODOtaskHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.setNewTodoTask({ value: e.target.value }));
  };

  return (
    <div className={classes["new__todo-new-task-form"]}>
      <textarea
        spellCheck={false}
        placeholder="Enter new task..."
        className={classes["new__todo-new-task-input"]}
        value={newTodoTask}
        onChange={addTODOtaskHandler}
      ></textarea>
      <button
        type="submit"
        className={classes["new__todo-add-task-btn"]}
        onClick={addNewTaskHandler}
      >
        <span className={classes["new__todo-add-text"]}>Add Task</span>
      </button>
    </div>
  );
};

export default AddNewTask;
