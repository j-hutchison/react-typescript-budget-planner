import React, {
	useRef,
	useContext,
	useEffect,
	InputHTMLAttributes,
} from "react";
import { TransactionContext } from "../../context/TransactionContext";
import classes from "./InputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	type: string;
	onChangeHandler?: (type: string) => void;
	onFilterHandler?: (value: string, name: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	name,
	label,
	type,
	onChangeHandler,
	onFilterHandler,
	...rest
}) => {
	const thisFieldRef = useRef<HTMLInputElement>(null);

	const { isFormSubmitted, updateIsFormSubmitted } =
		useContext(TransactionContext);

	useEffect(() => {
		if (isFormSubmitted) {
			thisFieldRef.current!.value = "";
			if (!updateIsFormSubmitted) return;
			updateIsFormSubmitted(false);
		}
	}, [isFormSubmitted, updateIsFormSubmitted]);

	const onChangeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
		const elementValue = event.currentTarget.value;

		if (onChangeHandler) {
			onChangeHandler(elementValue);
		}
		if (onFilterHandler) {
			onFilterHandler(elementValue, name);
		}
	};

	return (
		<div className={classes.input}>
			<label className={classes["input-label"]} htmlFor={name}>
				{label}
			</label>
			<input
				type={type}
				id={name}
				ref={thisFieldRef}
				{...rest}
				className={"input-border"}
				onChange={onChangeInputValue}
			/>
		</div>
	);
};

export default InputField;
