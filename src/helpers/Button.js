//

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
