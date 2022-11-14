import React from "react";
import classes from "./SummaryLine.module.css";

interface SummaryLineProps {
	isOpeningBalance: boolean;
	balance: number;
	editable: boolean;
	onEditHandler?: (newBalance: number) => void;
}

const SummaryLine: React.FC<SummaryLineProps> = (props) => {
	// const onEditClickHandler = () => {
	// 	if (editEnabled) {
	// 		if (!inputRef.current) return;
	// 		const updatedBalance = inputRef.current.value;

	// 		if (!props.onEditHandler) return;
	// 		props.onEditHandler(+updatedBalance);
	// 	}
	// 	setEditEnabled((prevValue) => !prevValue);
	// };

	return (
		<div className={classes["summary-line"]}>
			<span className={classes["s-line-memo"]}>
				{props.isOpeningBalance ? "Opening Balance" : "Closing Balance"}
			</span>
			<div className={classes["s-line-cta"]}>{props.balance}</div>
		</div>
	);
};

export default SummaryLine;
