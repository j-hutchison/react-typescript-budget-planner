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
	TransactionType,
} from "../../models/Transaction";
import { IncomingMessage } from "http";

const AddTransaction = () => {
	let transactionTypeRef = useRef<string>("");
	let transactionMemoRef = useRef<string>("");
	let transactionAmountRef = useRef<number>(0);

	// Destructure addTransaction function from context
	const { addTransaction } = useContext(TransactionContext);

	//TODO: Fix so that values are pulled from TransactionType enum
	const transactionTypes = [{ name: "Incoming" }, { name: "Outgoing" }];

	const onChangeTransactionTypeHandler = (type: string) => {
		transactionTypeRef.current = type;
		console.log(`transactionTypeRef: ${transactionTypeRef.current}`);
	};
	const onChangeTransactionMemoHandler = (memo: string) => {
		transactionMemoRef.current = memo;
		console.log(`transactionMemoRef: ${transactionMemoRef.current}`);
	};
	const onChangeTransactionAmountHandler = (amount: string) => {
		transactionAmountRef.current = +amount;
		console.log(`transactionAmountRef: ${transactionAmountRef.current}`);
	};

	const onSaveTransactionHandler = () => {
		switch (transactionTypeRef.current) {
			case "Incoming":
				const newIncomingTransaction = new IncomingTransaction(
					(Math.random() * 10).toString(),
					transactionMemoRef.current,
					transactionAmountRef.current,
					new Date()
				);
				if (addTransaction) {
					addTransaction(newIncomingTransaction);
				}
				break;
			case "Outgoing":
				const newOutgoingTransaction = new OutgoingTransaction(
					(Math.random() * 10).toString(),
					transactionMemoRef.current,
					transactionAmountRef.current,
					new Date()
				);
				if (addTransaction) {
					addTransaction(newOutgoingTransaction);
				}
				break;
			default:
				throw new Error("Unexpected transaction type selected!");
		}
	};

	return (
		<section className={classes["add-transaction"]}>
			<h2>Add Transaction</h2>
			<section className={classes["add-transaction-inputs"]}>
				<Dropdown
					transactionTypes={transactionTypes}
					onChangeHandler={onChangeTransactionTypeHandler}
				/>
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
			<Button text="Save" onClickHandler={onSaveTransactionHandler}></Button>
		</section>
	);
};

export default AddTransaction;
