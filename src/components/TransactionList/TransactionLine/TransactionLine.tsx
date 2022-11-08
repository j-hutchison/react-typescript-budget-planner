import React from "react";
import classes from "./TransactionLine.module.css";
import AmountTag from "./AmountTag";
import DeleteButton from "./DeleteButton";
import { Transaction } from "../../../models/Transaction";

interface TransactionLineProps {
	data: Transaction;
}

const TransactionLine: React.FC<TransactionLineProps> = ({ data }) => {
	return (
		<div className={classes["transaction-line"]}>
			<span className={classes["t-line-memo"]}>{data.memo}</span>
			<div className={classes["t-line-cta"]}>
				<AmountTag amount={data.amount} />
				<DeleteButton id={data.id} />
			</div>
		</div>
	);
};

export default TransactionLine;
