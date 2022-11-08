import React, { useContext } from "react";

// Components Import
import Searchbar from "./Searchbar";
import TransactionLine from "./TransactionLine/TransactionLine";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

// Models Import
import {
	TransactionType,
	Transaction,
	IncomingTransaction,
	OutgoingTransaction,
} from "../../models/Transaction";

// CSS Import
import classes from "./TransactionList.module.css";

const TransactionList = () => {
	const { transactionList } = useContext(TransactionContext);

	return (
		<section className={classes["transaction-list"]}>
			<h2>Expenses</h2>
			<Searchbar />
			<section className={classes["transaction-lines"]}>
				{transactionList.map((transaction, key) => {
					return <TransactionLine key={key} data={transaction} />;
				})}
			</section>
		</section>
	);
};

export default TransactionList;
