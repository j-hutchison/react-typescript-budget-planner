import React, { useContext, useState, useRef, useEffect } from "react";

import { TransactionContext } from "../../context/TransactionContext";

import classes from "./Dropdown.module.css";

interface DropdownProps {
	label: string;
	fieldMapping: string;
	values: { name: string }[];
	isFilter?: boolean;
	onChangeHandler: (name: string, fieldMapping: string, type: string) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
	const [showDropdown, setShowDropdown] = useState(false);
	//TODO use actual 'TYPES' instead of strings
	const [dropdownValue, setDropdownValue] = useState("");

	const dropdownFieldRef = useRef<HTMLDivElement>(null);

	const { isFormSubmitted, updateIsFormSubmitted } =
		useContext(TransactionContext);

	useEffect(() => {
		if (isFormSubmitted) {
			if (!props.isFilter) {
				setDropdownValue(() => "");
				setShowDropdown(() => false);

				if (!updateIsFormSubmitted) return;
				updateIsFormSubmitted(false);
			}
		}
	}, [isFormSubmitted, updateIsFormSubmitted]);

	const onClickDropdownHandler = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setShowDropdown((prevValue) => !prevValue);
	};

	const onClickDropdownOptionHandler = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const selectedOption = event.target as HTMLInputElement;
		setDropdownValue(() => selectedOption.innerHTML);

		props.onChangeHandler(
			selectedOption.innerHTML,
			props.label,
			props.fieldMapping
		);

		setShowDropdown((prevValue) => !prevValue);
	};

	return (
		<div className={classes["dropdown"]}>
			<label className={classes["dropdown-label"]}>{props.label}</label>
			<div className={classes["dropdown-field"]}>
				<button onClick={onClickDropdownHandler} className="input-border">
					<div ref={dropdownFieldRef} id="dropdown-field-input">
						{dropdownValue ? dropdownValue : "Select value..."}
					</div>
				</button>
				{showDropdown && (
					<div className={`${classes["dropdown-list"]} input-border`}>
						<button
							key="null"
							className={classes["dropdown-option"]}
							onClick={onClickDropdownOptionHandler}
						></button>
						{props.values.map((value, i) => (
							<button
								key={i}
								className={classes["dropdown-option"]}
								onClick={onClickDropdownOptionHandler}
							>
								{value.name}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dropdown;
