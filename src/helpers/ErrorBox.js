//

import classes from "./ErrorBox.module.css";

const ErrorBox = (props) => {
  return (
    <div className={classes["error-container"]}>
      <p className={classes["error-text"]}>{props.text}</p>
    </div>
  );
};

export default ErrorBox;
