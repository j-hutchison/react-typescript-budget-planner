import React from "react";

import TransactionLine from "./TransactionLine/TransactionLine";
import classes from "./TransactionList.module.css";

const TransactionList = () => {
	return (
		<section className={classes["transaction-list"]}>
			<h2>Expenses</h2>
			<input
				type="text"
				id={classes["transaction-search"]}
				placeholder="Type to search..."
			/>
			<section className={classes["transaction-lines"]}>
				<TransactionLine
					id="i1"
					memo="Shopping"
					type="outgoing"
					amount={50}
					date={new Date()}
				></TransactionLine>
				<TransactionLine
					id="i2"
					memo="Holiday"
					type="outgoing"
					amount={250}
					date={new Date()}
				></TransactionLine>
			</section>
		</section>
	);
};

export default TransactionList;
