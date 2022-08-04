//
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/redux-store";

import classes from "./NewTodoHeader.module.css";

const NewTodoHeader = (props) => {
  const dispatch = useDispatch();
  const { newTODO } = useSelector((state) => state.task);

  const addTODOTitleHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.setTODOTitle({ value: e.target.value }));
  };

  return (
    <div className={classes["todo__form-header"]}>
      <textarea
        placeholder={"Enter the title..."}
        spellCheck={false}
        className={classes["todo__form-title"]}
        onChange={addTODOTitleHandler}
        value={newTODO.title}
      ></textarea>
    </div>
  );
};

export default NewTodoHeader;
