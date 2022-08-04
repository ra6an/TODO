//

// COMPONENTS
import AddedTasks from "./AddedTasks";
import AddNewTask from "./AddNewTask";
// import AddedTasks from "./AddedTasks";

import classes from "./NewTodoBody.module.css";

const NewTodoBody = (props) => {
  return (
    <div className={classes["new__todo-body"]}>
      <AddedTasks />
      <AddNewTask />
    </div>
  );
};

export default NewTodoBody;
