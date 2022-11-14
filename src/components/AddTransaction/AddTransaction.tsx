import React, { useContext, useRef } from "react";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

// Import Components
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

const AddTransaction = () => {
	let transactionTypeRef = useRef<string>("");
	let transactionMemoRef = useRef<string>("");
	let transactionDateRef = useRef<string>("");
	let transactionAmountRef = useRef<number>(0);

	// Destructure addTransaction function from context
	const { addTransaction, updateIsFormSubmitted } =
		useContext(TransactionContext);

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

	// Triggered upon clicking the save button in 'Add Transaction'
	const onSaveTransactionHandler = (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		// Protects against event bubbling triggering submit
		if (transactionMemoRef.current === "") return;
		let transactionDateCleansed = new Date(transactionDateRef.current);
		transactionDateCleansed.setHours(0, 0, 0, 0);

		let newTransaction: Transaction;
		const newTransactionId = (Math.random() * 10).toString();
		const newTransactionMemo = transactionMemoRef.current;
		const newTransactionAmount = transactionAmountRef.current;
		const newTransactionDate = transactionDateCleansed;

		switch (transactionTypeRef.current) {
			case "Incoming":
				newTransaction = new IncomingTransaction(
					newTransactionId,
					newTransactionMemo,
					newTransactionAmount,
					newTransactionDate
				);
				break;
			case "Outgoing":
				newTransaction = new OutgoingTransaction(
					newTransactionId,
					newTransactionMemo,
					newTransactionAmount * -1,
					newTransactionDate
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
				</section>
				<Button type="submit" text="Save"></Button>
			</form>
		</section>
	);
};

export default AddTransaction;
