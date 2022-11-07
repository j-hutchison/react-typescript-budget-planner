import React from "react";
import Button from "./Button";
import classes from "./TransactionSummaryTab.module.css";

interface SummaryTabProps {
	title: string;
	balance: number;
	color: "grey" | "green" | "blue";
	editable: boolean;
}

const onEditClickHandler = () => {
	alert("Edit Clicked!");
};

const TransactionSummaryTab: React.FC<SummaryTabProps> = (props) => {
	return (
		<div className={`${classes.tab} ${classes[`tab--${props.color}`]}`}>
			<p>
				{props.title}: €{props.balance}
			</p>
			{props.editable && (
				<Button text="Edit" onClickHandler={onEditClickHandler} />
			)}
		</div>
	);
};

export default TransactionSummaryTab;
