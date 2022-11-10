import React, { useContext } from "react";

// Components Import
import Searchbar from "./Searchbar";
import TransactionLine from "./TransactionLine/TransactionLine";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

// CSS Import
import classes from "./TransactionList.module.css";

const TransactionList = () => {
	const { transactionList, searchCriteria } = useContext(TransactionContext);

	return (
		<section className={classes["transaction-list"]}>
			<h2>Transactions</h2>
			<Searchbar />
			<section className={classes["transaction-lines"]}>
				{transactionList
					.filter((transaction) =>
						transaction.memo
							.toLowerCase()
							.includes(searchCriteria.toLowerCase())
					)
					.map((transaction, key) => {
						return <TransactionLine key={key} data={transaction} />;
					})}
			</section>
		</section>
	);
};

export default TransactionList;
