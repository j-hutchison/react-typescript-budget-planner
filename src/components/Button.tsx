import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
	text: string;
	type: "button" | "submit";
	onClickHandler?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			type={props.type}
			className={classes.btn}
			onClick={props.onClickHandler}
		>
			{props.text}
		</button>
	);
};

export default Button;
