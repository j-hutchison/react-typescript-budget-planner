import React, { useContext, useRef } from "react";

// Context Import
import { TransactionContext } from "../../context/TransactionContext";

// Import Components
import Dropdown from "./Dropdown";
import InputField from "./InputField";
import Button from "../Button";

// Import CSS
import classes from "./AddTransaction.module.css";

const AddTransaction = () => {
	const transactionMemoRef = useRef<HTMLInputElement>(null);
	const transactionAmountRef = useRef<HTMLInputElement>(null);

	const { addTransaction } = useContext(TransactionContext);

	//TODO: Fix so that values are pulled from TransactionType enum
	const transactionTypes = [{ name: "Incoming" }, { name: "Outgoing" }];

	const onSaveTransactionHandler = () => {
		console.log("Saved!");
	};

	return (
		<section className={classes["add-transaction"]}>
			<h2>Add Transaction</h2>
			<section className={classes["add-transaction-inputs"]}>
				<Dropdown transactionTypes={transactionTypes} />
				<InputField
					name="transaction-memo"
					label="Name"
					type="text"
				></InputField>
				<InputField
					name="transaction-amount"
					label="Amount"
					type="number"
				></InputField>
			</section>
			<Button text="Save" onClickHandler={onSaveTransactionHandler}></Button>
		</section>
	);
};

export default AddTransaction;
