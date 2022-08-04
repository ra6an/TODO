//

// COMPONENTS
import NewTodoHeader from "./NewTodoHeader";
import NewTodoBody from "./NewTodoBody";

import classes from "./NewTodoForm.module.css";

const NewTodoForm = (props) => {
  return (
    <div className={classes["todo__form-container"]}>
      <NewTodoHeader />
      <NewTodoBody />
    </div>
  );
};

export default NewTodoForm;
