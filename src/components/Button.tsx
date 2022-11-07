import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
	text: string;
	onClickHandler: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button className={classes.btn} onClick={props.onClickHandler}>
			{props.text}
		</button>
	);
};

export default Button;
