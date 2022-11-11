import React, { useContext, useRef } from "react";

// Components Import
import Searchbar from "./Searchbar";
import TransactionLine from "./TransactionLine/TransactionLine";
import InputField from "../AddTransaction/InputField";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

import { Filter } from "../../models/Filter";

// CSS Import
import classes from "./TransactionList.module.css";
import Dropdown from "../AddTransaction/Dropdown";

const TransactionList = () => {
	const transactionTypeFilterRef = useRef(false);

	const {
		transactionList,
		searchCriteria,
		updateFilterFlags,
		filterByTransactionType,
		filterByMaxMin,
	} = useContext(TransactionContext);

	//TODO: Fix so that values are pulled from TransactionType enum
	const transactionTypes = [{ name: "Incoming" }, { name: "Outgoing" }];

	const onChangeTypeFilterHandler = (
		selectedOption: string,
		name: string,
		fieldMapping: string
	) => {
		const thisFilter = new Filter(name, fieldMapping, selectedOption);
		if (!updateFilterFlags) return;
		updateFilterFlags(thisFilter);

		if (!selectedOption) return;

		if (selectedOption === "Incoming") {
			console.log("Incoming");
			transactionTypeFilterRef.current = true;
		} else {
			console.log("Outgoing");
			transactionTypeFilterRef.current = false;
		}
	};

	const onChangeMaxMinFilterHandler = (value: string, name: string) => {
		const thisFilter = new Filter(name, "amount", value);

		if (!updateFilterFlags) return;
		if (value === "") {
			updateFilterFlags(thisFilter, true);
		} else {
			updateFilterFlags(thisFilter);
		}
	};

	return (
		<section className={classes["transaction-list"]}>
			<h2>Transactions</h2>
			<Searchbar />

			<div className={classes["filters"]}>
				<Dropdown
					label="Transaction Type"
					fieldMapping="type"
					values={transactionTypes}
					onChangeHandler={onChangeTypeFilterHandler}
				/>
				<InputField
					name="transaction-filter-min"
					label="Min Value"
					type="number"
					onFilterHandler={onChangeMaxMinFilterHandler}
				></InputField>
				<InputField
					name="transaction-filter-max"
					label="Max Value"
					type="number"
					onFilterHandler={onChangeMaxMinFilterHandler}
				></InputField>
			</div>
			<section className={classes["transaction-lines"]}>
				{transactionList
					.filter((transaction) => {
						if (!filterByTransactionType) return true;
						return filterByTransactionType(transaction);
					})
					.filter((transaction) => {
						if (!filterByMaxMin) return true;
						return filterByMaxMin(transaction);
					})
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
