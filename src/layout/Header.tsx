import React, { useContext } from "react";
import classes from "./Header.module.css";
import TransactionSummaryTab from "../components/TransactionSummaryTab";

import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
	const { balance, getTransactionValue } = useContext(TransactionContext);
	const amountSpent = getTransactionValue! && getTransactionValue();

	return (
		<header className={classes.wrapper}>
			<h1 className={classes.title}>My Budget Plannner</h1>
			<div className={classes["transaction-summary"]}>
				<TransactionSummaryTab
					title="Balance"
					balance={balance}
					color="grey"
					editable={true}
				/>
				<TransactionSummaryTab
					title="Remaining"
					balance={balance - amountSpent}
					color="green"
					editable={false}
				/>
				<TransactionSummaryTab
					title="Spent so far"
					balance={amountSpent}
					color="blue"
					editable={false}
				/>
			</div>
		</header>
	);
};

export default Header;
