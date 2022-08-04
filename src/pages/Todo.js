//
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { taskActions } from "../store/redux-store";
// import { getTasks } from "../store/reducers/task-slice";

// COMPONENTS
import SingleTodo from "../components/todos/SingleTodo";
import NewTodoForm from "../components/new-todo/NewTodoForm";
import Button from "../helpers/Button";

import classes from "./Todo.module.css";
import { taskActions } from "../store/redux-store";

const Todo = (props) => {
  const [newTodoIsActive, setNewTodoIsActive] = useState(false);
  // const [localStorageTasks, setLocalStorageTasks] = useState([]);
  const [tasksSorted, setTasksSorted] = useState([]);
  const dispatch = useDispatch();
  const { allTasks, newTODO } = useSelector((state) => state.task);

  // useEffect(() => {
  //   if (localStorage.getItem("task")) {
  //     setLocalStorageTasks([JSON.parse(localStorage.getItem("tasks"))]);
  //   }
  // }, []);

  useEffect(() => {
    const sortedTasks = [
      {
        todoTitle: "List of tasks 1",
        tasks: [],
      },
    ];
    if (allTasks.length > 0) {
      allTasks.forEach((task) => {
        const title = sortedTasks.filter((t) => t.todoTitle === task.todoTitle);
        if (!task.todoTitle) {
          sortedTasks[0].tasks.push(task);
        } else if (task.todoTitle && title.length === 0) {
          sortedTasks.push({
            todoTitle: task.todoTitle,
            tasks: [task],
          });
        } else if (task.todoTitle && title.length > 0) {
          sortedTasks.forEach((t, i, arr) => {
            if (t.todoTitle === task.todoTitle) {
              console.log(sortedTasks[i].tasks);
              sortedTasks[i].tasks.push(task);
            }
          });
        }
      });

      if (localStorage.getItem("tasks")) {
        const taskLS = JSON.parse(localStorage.getItem("tasks"));
      }
      setTasksSorted(sortedTasks);
    }
  }, [allTasks]);

  const activateTodoFormHandler = (e) => {
    e.preventDefault();
    setNewTodoIsActive(true);
  };

  // console.log(allTasks[allTasks.length - 1].id);

  const createNewTodoHandler = (e) => {
    e.preventDefault();

    if (newTODO.title.length > 0 && newTODO.tasks.length > 0) {
      // setLastId(allTasks[allTasks.length - 1].id);
      let taskId = allTasks[allTasks.length - 1].id + 1;
      const tasksLS = JSON.parse(localStorage.getItem("tasks"));
      newTODO.tasks.forEach((task) => {
        const newTask = {
          id: taskId,
          title: task,
          todoTitle: newTODO.title,
          completed: false,
          active: true,
        };
        tasksLS.push(newTask);
        taskId++;
      });

      localStorage.setItem("tasks", JSON.stringify(tasksLS));
      dispatch(taskActions.updateAllTasks());
      dispatch(taskActions.resetTODO());
      setNewTodoIsActive(false);
    }

    if (newTODO.title.length === 0 && newTODO.tasks.length === 0) {
      dispatch(
        taskActions.setError({
          value: "You need to enter title and at least one task!",
        })
      );
    } else if (newTODO.title.length === 0) {
      dispatch(taskActions.setError({ value: "You need to enter title!" }));
    } else if (newTODO.tasks.length === 0) {
      dispatch(
        taskActions.setError({ value: "You need to add at least one task!" })
      );
    }
  };

  const cancelNewTodoHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.resetTODO());
    dispatch(taskActions.setNewTodoTask({ value: "" }));
    setNewTodoIsActive(false);
  };

  console.log(tasksSorted);

  const todos = tasksSorted.map((todo, i) => {
    if (
      todo.tasks.filter((t) => t.active === true).length > 0 ||
      todo.tasks.filter((t) => t.active === undefined).length > 0
    ) {
      return <SingleTodo key={i} data={todo} />;
    } else {
      return null;
    }
  });

  return (
    <div className={classes.todo}>
      <div className={classes["todo-container"]}>{todos}</div>
      <div className={classes["separator"]}></div>
      {newTodoIsActive && <NewTodoForm />}
      {!newTodoIsActive && (
        <Button
          className={classes["todo-btn-new-todo"]}
          text="New TODO"
          onClick={activateTodoFormHandler}
        />
      )}
      {newTodoIsActive && (
        <div className={classes["todo-btn-container"]}>
          <Button
            className={classes["todo-btn-cancel"]}
            text="Cancel"
            onClick={cancelNewTodoHandler}
          />
          <Button
            className={classes["todo-btn-new-todo"]}
            text="Create TODO"
            onClick={createNewTodoHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
