import React, { useContext, useRef } from "react";

// Components Import
import Searchbar from "./Searchbar";
import TransactionLine from "./TransactionLine/TransactionLine";
import InputField from "../AddTransaction/InputField";
import SummaryLine from "./SummaryLine/SummaryLine";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

import { Filter } from "../../models/Filter";

// CSS Import
import classes from "./TransactionList.module.css";
import Dropdown from "../AddTransaction/Dropdown";

const TransactionList = () => {
	const transactionTypeFilterRef = useRef(false);
	const transactionDateFromRef = useRef<Date>();
	const transactionDateToRef = useRef<Date>();

	const {
		transactionList,
		searchCriteria,
		updateFilterFlags,
		filterByTransactionType,
		filterByMaxMin,
		filterByFromToDate,
		getBalanceAsOfDate,
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

	const onChangeFromToDateFilterHandler = (value: string, name: string) => {
		let cleansedDate = new Date(value);
		cleansedDate.setHours(0, 0, 0, 0);

		const thisFilter = new Filter(name, "date", cleansedDate);
		console.log(value, name);

		// manage the filter object in context
		if (!updateFilterFlags) return;
		if (value === "") {
			updateFilterFlags(thisFilter, true);
		} else {
			updateFilterFlags(thisFilter);
		}

		//
		if (name.includes("todate")) {
			transactionDateToRef.current = cleansedDate;
		} else if (name.includes("fromdate")) {
			transactionDateFromRef.current = cleansedDate;
		}
	};

	return (
		<section className={classes["transaction-list"]}>
			<h2>Transactions</h2>
			<Searchbar />

			<div className={classes["filters"]}>
				<h3>Filters</h3>
				<Dropdown
					label="Transaction Type"
					fieldMapping="type"
					values={transactionTypes}
					isFilter={true}
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
				<InputField
					name="transaction-filter-fromdate"
					label="Date (from)"
					type="date"
					onFilterHandler={onChangeFromToDateFilterHandler}
				></InputField>
				<InputField
					name="transaction-filter-todate"
					label="Date (to)"
					type="date"
					onFilterHandler={onChangeFromToDateFilterHandler}
				></InputField>
			</div>
			<SummaryLine
				isOpeningBalance={true}
				balance={
					getBalanceAsOfDate
						? getBalanceAsOfDate(transactionDateFromRef.current!, "from")
						: 0
				}
				editable={false}
			/>
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
					.filter((transaction) => {
						if (!filterByFromToDate) return true;
						return filterByFromToDate(transaction);
					})
					.filter((transaction) =>
						transaction.memo
							.toLowerCase()
							.includes(searchCriteria.toLowerCase())
					)
					.sort((transactionA, transactionB) => {
						return transactionA.date.getTime() - transactionB.date.getTime();
					})
					.map((transaction, key) => {
						return <TransactionLine key={key} data={transaction} />;
					})}
			</section>
			<SummaryLine
				isOpeningBalance={false}
				balance={
					getBalanceAsOfDate
						? getBalanceAsOfDate(transactionDateToRef.current!, "to")
						: 0
				}
				editable={false}
			/>
		</section>
	);
};

export default TransactionList;
