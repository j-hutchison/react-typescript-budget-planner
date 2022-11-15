import React, { useContext, useRef } from "react";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

// Import Components
import AdvancedInputOptions from "./AdvancedInputOptions";
import Dropdown from "./Dropdown";
import InputField from "./InputField";
import Button from "../Button";

// Import CSS
import classes from "./AddTransaction.module.css";

// Import Models
import {
	IncomingTransaction,
	OutgoingTransaction,
	Transaction,
} from "../../models/Transaction";

import { DateTime } from "luxon";

const AddTransaction = () => {
	let transactionTypeRef = useRef<string>("");
	let transactionMemoRef = useRef<string>("");
	let transactionDateRef = useRef<string>("");
	let transactionAmountRef = useRef<number>(0);

	let recurringDayRef = useRef<number>();
	let recurringMonthRef = useRef<number>();

	// Destructure addTransaction function from context
	const {
		addTransaction,
		updateIsFormSubmitted,
		isTransactionRecurring,
		toggleIsTransactionRecurring,
	} = useContext(TransactionContext);

	//TODO: Fix so that values are pulled from TransactionType enum
	const transactionTypes = [{ name: "Incoming" }, { name: "Outgoing" }];

	const onChangeTransactionTypeHandler = (type: string) => {
		transactionTypeRef.current = type;
	};
	const onChangeTransactionMemoHandler = (memo: string) => {
		transactionMemoRef.current = memo;
	};
	const onChangeTransactionAmountHandler = (amount: string) => {
		transactionAmountRef.current = +amount;
	};
	const onChangeTransactionDateHandler = (date: string) => {
		transactionDateRef.current = date;
	};

	const onToggleTransactionIsRecurring = (isRecurring: boolean) => {
		if (!toggleIsTransactionRecurring) return;
		toggleIsTransactionRecurring(isRecurring);
	};

	const onChangeAdvancedOptions = (
		day: number,
		monthRepetition: number
	): void => {
		recurringDayRef.current = day;
		recurringMonthRef.current = monthRepetition;
	};

	const monthDiff = (dateFrom: Date, dateTo: Date): number => {
		return (
			dateTo.getMonth() -
			dateFrom.getMonth() +
			12 * (dateTo.getFullYear() - dateFrom.getFullYear())
		);
	};

	const buildTransactionSchedule = (newTransactionDate: Date): Date[] => {
		const transactionDateArray = [newTransactionDate];

		// CREATE TRANSACTIONS MAX UNTIL END OF NEXT YEAR
		let MAX_MONTHS =
			monthDiff(
				newTransactionDate,
				new Date(newTransactionDate.getFullYear() + 1, 11, 31)
			) - 1;

		console.log(`MAX_MONTHS: ${MAX_MONTHS}`);

		const nextTransactionDate = new Date(
			newTransactionDate.getFullYear(),
			newTransactionDate.getMonth(),
			recurringDayRef.current!
		);

		console.log(nextTransactionDate);

		while (MAX_MONTHS > 0) {
			let thisTransactionDate = DateTime.fromJSDate(nextTransactionDate).plus({
				months: MAX_MONTHS,
			});
			console.log(
				`thisTransactionDate: ${thisTransactionDate.toLocaleString()}`
			);
			MAX_MONTHS -= recurringMonthRef.current!;
			console.log(`MAX_MONTHS UPDATED: ${MAX_MONTHS}`);

			transactionDateArray.push(thisTransactionDate.toJSDate());
		}
		return transactionDateArray;
	};

	// Triggered upon clicking the save button in 'Add Transaction'
	const onSaveTransactionHandler = (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		// Protects against event bubbling triggering submit
		if (transactionMemoRef.current === "") return;
		let transactionDateCleansed = new Date(transactionDateRef.current);
		transactionDateCleansed.setHours(0, 0, 0, 0);

		let newTransaction: Transaction[];
		const newTransactionMemo = transactionMemoRef.current;
		const newTransactionAmount = transactionAmountRef.current;
		const newTransactionDate = transactionDateCleansed;

		const transactionSchedule = isTransactionRecurring
			? buildTransactionSchedule(newTransactionDate)
			: [newTransactionDate];

		console.log(transactionSchedule);

		switch (transactionTypeRef.current) {
			case "Incoming":
				newTransaction = transactionSchedule.map(
					(date) =>
						new IncomingTransaction(
							(Math.random() * 10).toString(),
							newTransactionMemo,
							newTransactionAmount,
							date
						)
				);
				break;
			case "Outgoing":
				newTransaction = transactionSchedule.map(
					(date) =>
						new OutgoingTransaction(
							(Math.random() * 10).toString(),
							newTransactionMemo,
							newTransactionAmount * -1,
							date
						)
				);
				break;
			default:
				throw new Error("Unexpected transaction type selected!");
		}

		if (!addTransaction) return;
		addTransaction(newTransaction);

		if (!updateIsFormSubmitted) return;
		updateIsFormSubmitted(true);

		transactionMemoRef.current = "";
		transactionAmountRef.current = 0;
		transactionDateRef.current = "";
	};

	return (
		<section className={classes["add-transaction"]}>
			<h2>Add Transaction</h2>
			<form onSubmit={onSaveTransactionHandler}>
				<section className={classes["add-transaction-inputs"]}>
					<Dropdown
						label="Transaction Type"
						fieldMapping=""
						values={transactionTypes}
						onChangeHandler={onChangeTransactionTypeHandler}
					/>
					<InputField
						name="transaction-date"
						label="Date"
						type="date"
						onChangeHandler={onChangeTransactionDateHandler}
					></InputField>

					<InputField
						name="transaction-memo"
						label="Name"
						type="text"
						onChangeHandler={onChangeTransactionMemoHandler}
					></InputField>
					<InputField
						name="transaction-amount"
						label="Amount"
						type="number"
						onChangeHandler={onChangeTransactionAmountHandler}
					></InputField>
					<InputField
						name="transaction-recurring"
						label="Make recurring"
						type="checkbox"
						onToggleHandler={onToggleTransactionIsRecurring}
					></InputField>
				</section>
				{isTransactionRecurring && (
					<AdvancedInputOptions
						onChangeAdvancedOptions={onChangeAdvancedOptions}
					/>
				)}
				<Button type="submit" text="Save"></Button>
			</form>
		</section>
	);
};

export default AddTransaction;
