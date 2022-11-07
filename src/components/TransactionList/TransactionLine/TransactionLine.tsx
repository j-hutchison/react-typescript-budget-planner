import React from "react";
import classes from "./TransactionLine.module.css";
import AmountTag from "./AmountTag";
import DeleteButton from "./DeleteButton";

interface TransactionLineProps {
	id: string;
	type: "incoming" | "outgoing";
	memo: string;
	amount: number;
	date: Date;
}

const TransactionLine: React.FC<TransactionLineProps> = (props) => {
	return (
		<div className={classes["transaction-line"]}>
			<span className={classes["t-line-memo"]}>{props.memo}</span>
			<div className={classes["t-line-cta"]}>
				<AmountTag amount={props.amount} />
				<DeleteButton id={props.id} />
			</div>
		</div>
	);
};

export default TransactionLine;
