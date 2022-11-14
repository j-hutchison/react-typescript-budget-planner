import React, { useContext } from "react";

// Component Imports
import AmountTag from "./AmountTag";
import DeleteButton from "./DeleteButton";
import AlertIcon from "./AlertIcon";
import { Transaction } from "../../../models/Transaction";

// Context Import
import { TransactionContext } from "../../../context/TransactionContext";

// CSS Import
import classes from "./TransactionLine.module.css";
import { spawn } from "child_process";
interface TransactionLineProps {
	data: Transaction;
}

const TransactionLine: React.FC<TransactionLineProps> = ({ data }) => {
	const { deleteTransaction, balance, getBalanceAsOfDate, minBalance } =
		useContext(TransactionContext);

	return (
		<div className={classes["transaction-line"]}>
			<span className={classes["t-line-memo"]}>{data.date.toDateString()}</span>
			<span className={classes["t-line-memo"]}>{data.memo}</span>
			<div className={classes["t-line-cta"]}>
				{getBalanceAsOfDate &&
				getBalanceAsOfDate(data.date, "to") < minBalance ? (
					<AlertIcon tooltip="Transaction has caused you to exceed your min. balance" />
				) : (
					""
				)}
				<AmountTag amount={data.amount} isCredit={data.isCredit} />
				<DeleteButton id={data.id} onClickHandler={deleteTransaction!} />
			</div>
		</div>
	);
};

export default TransactionLine;
