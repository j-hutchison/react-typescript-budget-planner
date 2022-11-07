import React from "react";
import classes from "./AmountTag.module.css";

interface AmountTagProps {
	amount: number;
}

const AmountTag: React.FC<AmountTagProps> = (props) => {
	return (
		<div className={classes["amount-tag"]}>
			<span className={classes["amount-tag-value"]}>€{props.amount}</span>
		</div>
	);
};

export default AmountTag;
