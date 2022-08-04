//
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/redux-store";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
  RiDeleteBinLine,
  RiEditLine,
  RiCheckFill,
  RiCloseFill,
} from "react-icons/ri";

import classes from "./SingleTask.module.css";

const SingleTask = (props) => {
  const [canEdit, setCanEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const { newTaskText, activeEdit, activeDelete } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (activeEdit !== props.data.id) setCanEdit(false);
  }, [activeEdit, props.data.id]);

  useEffect(() => {
    if (activeDelete !== props.data.id) setConfirmDelete(false);
  }, [activeDelete, props.data.id]);

  const editTaskHandler = (e) => {
    e.preventDefault();
    setCanEdit(true);
    // props.editIsActive.set(true);
    dispatch(taskActions.setNewTaskText({ value: props.data.title }));
    dispatch(taskActions.setActiveEdit({ value: props.data.id }));
  };

  const commitEditHandler = (e) => {
    e.preventDefault();
    let tasksLS = JSON.parse(localStorage.getItem("tasks"));
    let includes;

    if (tasksLS && tasksLS.length > 0) {
      includes = tasksLS.filter((task) => task.id === props.data.id).length > 0;
    }
    let copyOfTask = { ...props.data };

    if (!includes) {
      copyOfTask.title = newTaskText;
      tasksLS.push(copyOfTask);
    } else {
      tasksLS.forEach((task, i, arr) => {
        if (task.id === props.data.id) {
          arr[i].title = newTaskText;
        }
      });
    }

    localStorage.setItem("tasks", JSON.stringify(tasksLS));

    dispatch(taskActions.updateAllTasks());
    dispatch(taskActions.setNewTaskText({ value: "" }));
    dispatch(taskActions.setActiveEdit({ value: null }));

    setCanEdit(false);
  };

  const cancelEditHandler = (e) => {
    e.preventDefault();

    setCanEdit(false);

    // props.cancelAllEdit(true);
    dispatch(taskActions.setNewTaskText({ value: "" }));
    dispatch(taskActions.setActiveEdit({ value: null }));
  };

  const deleteConfirmHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.setActiveDelete({ value: props.data.id }));
    setConfirmDelete(true);
  };

  const cancelDeleteHandler = (e) => {
    e.preventDefault();
    setConfirmDelete(false);
    dispatch(taskActions.setActiveDelete({ value: null }));
  };

  const deleteTaskHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.deleteTaskFromAllTasks({ data: props.data }));
    dispatch(taskActions.updateAllTasks());
    dispatch(taskActions.setActiveDelete({ value: null }));
  };

  const updateTaskHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.setNewTaskText({ value: e.target.value }));
  };

  const changeTaskCompletedHandler = (e) => {
    e.preventDefault();

    setConfirmDelete(false);
    setCanEdit(false);

    let tasksLS = JSON.parse(localStorage.getItem("tasks"));
    let includes;

    if (tasksLS && tasksLS.length > 0) {
      includes = tasksLS.filter((task) => task.id === props.data.id).length > 0;
    }
    let copyOfTask = { ...props.data };

    if (!includes) {
      copyOfTask.completed = !props.data.completed;
      tasksLS.push(copyOfTask);
    } else {
      tasksLS.forEach((task, i, arr) => {
        if (task.id === props.data.id) {
          arr[i].completed = !task.completed;
        }
      });
    }

    localStorage.setItem("tasks", JSON.stringify(tasksLS));

    dispatch(taskActions.updateAllTasks());
  };

  return (
    <li
      className={classes["single__task"]}
      id={props.data.id}
      key={props.data.id}
    >
      {props.data.completed ? (
        <RiCheckboxBlankCircleFill
          className={classes["task__icon-checkbox"]}
          onClick={changeTaskCompletedHandler}
        />
      ) : (
        <RiCheckboxBlankCircleLine
          className={classes["task__icon-checkbox"]}
          onClick={changeTaskCompletedHandler}
        />
      )}
      {!canEdit && (
        <p
          className={`${classes["task-text"]} ${
            classes[`${props.data.completed}`]
          }`}
        >
          {props.data.title}
        </p>
      )}
      {canEdit && (
        <textarea
          className={classes["single__task-update"]}
          value={newTaskText}
          onChange={updateTaskHandler}
          spellCheck={false}
        ></textarea>
      )}
      {props.data.completed && (
        <RiDeleteBinLine
          onClick={deleteConfirmHandler}
          className={classes["task__icon-del-edit"]}
          style={confirmDelete && { color: "var(--color-purple)" }}
        />
      )}
      {!props.data.completed && !canEdit && (
        <RiEditLine
          onClick={editTaskHandler}
          className={classes["task__icon-del-edit"]}
        />
      )}
      {!props.data.completed && canEdit && (
        <div className={classes["task__icon-accept-and-cancel"]}>
          <RiCheckFill
            onClick={commitEditHandler}
            className={classes["task__icon-anc"]}
          />
          <RiCloseFill
            onClick={cancelEditHandler}
            className={`${classes["task__icon-anc"]} ${classes["mar-r"]}`}
          />
        </div>
      )}
      {confirmDelete && (
        <div className={classes["confirm-delete"]}>
          <p>Are you sure?</p>
          <div className={classes["delete-yes-or-no"]}>
            <span className={classes["delete-btn"]} onClick={deleteTaskHandler}>
              Yes
            </span>
            <span
              className={classes["delete-btn"]}
              onClick={cancelDeleteHandler}
            >
              No
            </span>
          </div>
        </div>
      )}
    </li>
  );
};

export default SingleTask;
