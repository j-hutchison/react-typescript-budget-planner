import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import classes from "./TransactionSummaryTab.module.css";

interface SummaryTabProps {
	title: string;
	balance: number;
	color: "grey" | "green" | "blue";
	editable: boolean;
	onEditHandler?: (newBalance: number) => void;
}

const TransactionSummaryTab: React.FC<SummaryTabProps> = (props) => {
	const [editEnabled, setEditEnabled] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Set the balance field initially to equal the state balance
	useEffect(() => {
		if (inputRef) {
			inputRef.current!.value = props.balance.toString();
		}
		if (!editEnabled) {
			inputRef.current?.focus();
		}
	}, [props.balance, editEnabled]);

	const onEditClickHandler = () => {
		if (editEnabled) {
			if (!inputRef.current) return;
			const updatedBalance = inputRef.current.value;

			if (!props.onEditHandler) return;
			props.onEditHandler(+updatedBalance);
		}
		setEditEnabled((prevValue) => !prevValue);
	};

	return (
		<div className={`${classes.tab} ${classes[`tab--${props.color}`]}`}>
			<label className={classes["tab-input-label"]} htmlFor="tab-input">
				{props.title}
			</label>
			<input
				type="text"
				ref={inputRef}
				id={classes["tab-input"]}
				className="input-border"
				disabled={!editEnabled}
			/>

			{props.editable && (
				<Button
					text={!editEnabled ? "Edit" : "Save"}
					onClickHandler={onEditClickHandler}
				/>
			)}
		</div>
	);
};

export default TransactionSummaryTab;
