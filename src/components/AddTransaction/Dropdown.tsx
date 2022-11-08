import React, { useState, useRef } from "react";
import classes from "./Dropdown.module.css";

interface DropdownProps {
	transactionTypes: { name: string }[];
}

const Dropdown: React.FC<DropdownProps> = (props) => {
	const [isActive, setIsActive] = useState(false);

	//TODO use actual 'TYPES' instead of strings
	const [transactionType, setTransactionType] = useState("");

	const transactionTypeRef = useRef<HTMLDivElement>(null);

	const onClickDropdownHandler = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setIsActive((prevValue) => !prevValue);
	};

	const onClickDropdownOptionHandler = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const selectedElement = event.target as HTMLInputElement;
		setTransactionType(() => selectedElement.innerHTML);

		setIsActive((prevValue) => {
			return false;
		});
	};

	return (
		<div className={classes["dropdown"]}>
			<label className={classes["dropdown-label"]}>Transaction Type</label>
			<div className={classes["dropdown-field"]}>
				<button onClick={onClickDropdownHandler} className="input-border">
					<div ref={transactionTypeRef} id="dropdown-field-input">
						{transactionType ? transactionType : "Select type..."}
					</div>
				</button>
				{isActive && (
					<div className={`${classes["dropdown-list"]} input-border`}>
						{props.transactionTypes.map((transactionType, i) => (
							<button
								key={i}
								className={classes["dropdown-option"]}
								onClick={onClickDropdownOptionHandler}
							>
								{transactionType.name}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dropdown;
