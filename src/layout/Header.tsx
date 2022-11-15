import React, { useContext } from "react";
import classes from "./Header.module.css";
import TransactionSummaryTab from "../components/TransactionSummaryTab";

import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
	const { balance, minBalance, overwriteBalance, overwriteMinBalance } =
		useContext(TransactionContext);

	return (
		<header className={classes.wrapper}>
			<h1 className={classes.title}>My Budget Plannner</h1>
			<div className={classes["transaction-summary"]}>
				<TransactionSummaryTab
					title="Balance"
					balance={balance}
					color="grey"
					editable={true}
					onEditHandler={overwriteBalance}
				/>

				<TransactionSummaryTab
					title="Min. Balance"
					balance={minBalance}
					color="blue"
					editable={true}
					onEditHandler={overwriteMinBalance}
				/>
			</div>
		</header>
	);
};

export default Header;
