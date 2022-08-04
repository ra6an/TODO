//
import Button from "../../helpers/Button";

import classes from "./SingleTodoForm.module.css";

const SingleTodoForm = (props) => {
  return (
    <div className={classes["single__todo-form"]}>
      <textarea
        spellCheck={false}
        className={classes["single__todo-textarea"]}
        placeholder="Enter your task here..."
      ></textarea>
      <div className={classes["single__todo-btns"]}>
        <Button text="Cancel" className={classes["single__task-btn-cancel"]} />
        <Button
          text="Add Task"
          className={classes["single__task-btn-add-task"]}
        />
      </div>
    </div>
  );
};

export default SingleTodoForm;
