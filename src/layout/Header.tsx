import React from "react";
import classes from "./Header.module.css";
import TransactionSummaryTab from "../components/TransactionSummaryTab";

const Header = () => {
	return (
		<header className={classes.wrapper}>
			<h1 className={classes.title}>My Budget Plannner</h1>
			<div className={classes["transaction-summary"]}>
				<TransactionSummaryTab
					title="Balance"
					balance={2000}
					color="grey"
					editable={true}
				/>
				<TransactionSummaryTab
					title="Remaining"
					balance={1800}
					color="green"
					editable={false}
				/>
				<TransactionSummaryTab
					title="Spent so far"
					balance={200}
					color="blue"
					editable={false}
				/>
			</div>
		</header>
	);
};

export default Header;
