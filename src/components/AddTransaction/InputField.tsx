import React, { InputHTMLAttributes } from "react";
import classes from "./InputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	type: string;
}

const InputField: React.FC<InputFieldProps> = ({
	name,
	label,
	type,
	...rest
}) => {
	return (
		<div className={classes.input}>
			<label className={classes["input-label"]} htmlFor={name}>
				{label}
			</label>
			<input type={type} id={name} {...rest} className={"input-border"} />
		</div>
	);
};

export default InputField;
