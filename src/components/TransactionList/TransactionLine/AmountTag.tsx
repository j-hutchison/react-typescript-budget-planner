import React from "react";
import classes from "./AmountTag.module.css";

interface AmountTagProps {
	amount: number;
	isCredit: boolean;
}

const AmountTag: React.FC<AmountTagProps> = (props) => {
	return (
		<div
			className={`${classes["amount-tag"]} ${
				props.isCredit ? classes["amount-positive"] : classes["amount-negative"]
			}`}
		>
			<span className={classes["amount-tag-value"]}>€{props.amount}</span>
		</div>
	);
};

export default AmountTag;
