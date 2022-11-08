import React, { InputHTMLAttributes } from "react";
import classes from "./InputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	type: string;
	onChangeHandler: (type: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	name,
	label,
	type,
	onChangeHandler,
	...rest
}) => {
	const onChangeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
		const elementValue = event.currentTarget.value;
		onChangeHandler(elementValue);
	};

	return (
		<div className={classes.input}>
			<label className={classes["input-label"]} htmlFor={name}>
				{label}
			</label>
			<input
				type={type}
				id={name}
				{...rest}
				className={"input-border"}
				onChange={onChangeInputValue}
			/>
		</div>
	);
};

export default InputField;
