import React from "react";
import classes from "./AddTransaction.module.css";
import InputField from "./InputField";
import Button from "../Button";

const AddTransaction = () => {
	const onSaveTransactionHandler = () => {
		console.log("Saved!");
	};

	return (
		<section className={classes["add-transaction"]}>
			<h2>Add Transaction</h2>
			<section className={classes["add-transaction-inputs"]}>
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
