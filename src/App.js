import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../src/store/redux-store";
import { getTasks } from "./store/reducers/task-slice";

// COMPONENTS
import ErrorBox from "./helpers/ErrorBox";
import Todo from "./pages/Todo";
import "./App.css";

function App() {
  const [init, setInit] = useState(false);
  const [newError, setNewError] = useState("");
  const { error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (error) {
      setNewError(error);
      timer = setTimeout(() => {
        setNewError("");
        dispatch(taskActions.setError({ value: "" }));
      }, 1000 * 4);
    }

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) localStorage.setItem("userId", 1);
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify([]));

    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      dispatch(getTasks("https://jsonplaceholder.typicode.com/todos"));
    }
  }, [dispatch, init]);

  return (
    <Fragment>
      {newError && <ErrorBox text={newError} />}
      <div className="App">
        <Todo />
      </div>
    </Fragment>
  );
}

export default App;
