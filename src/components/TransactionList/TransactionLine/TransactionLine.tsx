import React, { useContext } from "react";

// Component Imports
import AmountTag from "./AmountTag";
import DeleteButton from "./DeleteButton";
import { Transaction } from "../../../models/Transaction";

// Context Import
import { TransactionContext } from "../../../context/TransactionContext";

// CSS Import
import classes from "./TransactionLine.module.css";
interface TransactionLineProps {
	data: Transaction;
}

const TransactionLine: React.FC<TransactionLineProps> = ({ data }) => {
	const { deleteTransaction } = useContext(TransactionContext);

	return (
		<div className={classes["transaction-line"]}>
			<span className={classes["t-line-memo"]}>{data.memo}</span>
			<div className={classes["t-line-cta"]}>
				<AmountTag amount={data.amount} />
				<DeleteButton id={data.id} onClickHandler={deleteTransaction!} />
			</div>
		</div>
	);
};

export default TransactionLine;
