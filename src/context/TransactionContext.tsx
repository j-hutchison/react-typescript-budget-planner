import React, { useState } from "react";
import { OutgoingTransaction, Transaction } from "../models/Transaction";

interface ITransactionContext {
	balance: number;
	transactionList: Transaction[];
	addTransaction?: (newTransaction: Transaction) => void;
	deleteTransaction?: (id: string) => void;
	getTransactionValue?: () => number;
	overwriteBalance?: (newBalance: number) => void;
}

const defaultState = {
	balance: 0,
	transactionList: [],
};

export const TransactionContext =
	React.createContext<ITransactionContext>(defaultState);

interface TransactionProviderProps {
	children: React.ReactNode;
}

const TransactionProvider: React.FC<TransactionProviderProps> = (props) => {
	const transaction1 = new OutgoingTransaction(
		"i1",
		"Shopping",
		50,
		new Date()
	);
	const transaction2 = new OutgoingTransaction(
		"i2",
		"Holiday",
		250,
		new Date()
	);
	const transaction3 = new OutgoingTransaction(
		"i3",
		"Transporation",
		25,
		new Date()
	);
	const transactions = [
		transaction1,
		transaction2,
		transaction3,
	] as Transaction[];

	// STATE AND FUNCTIONS RELATING TO BALANCE
	const [balance, setBalance] = useState(2100);
	const overwriteBalance = (newBalance: number) => {
		setBalance(() => newBalance);
	};

	const [transactionList, setTransactionList] =
		useState<Transaction[]>(transactions);

	const addTransaction = (newTransaction: Transaction) => {
		console.log("Adding new transaction");
		setTransactionList((prevValue) => [...prevValue, newTransaction]);
	};

	const deleteTransaction = (id: string): void => {
		console.log("Deleting transaction");
		setTransactionList((prevValue) =>
			prevValue.filter((transaction) => transaction.id !== id)
		);
	};

	const getTransactionValue = () => {
		return transactionList.reduce(
			(prevTransaction, currentTransaction) =>
				prevTransaction + currentTransaction.amount,
			0
		);
	};

	return (
		<TransactionContext.Provider
			value={{
				balance,
				transactionList,
				addTransaction,
				deleteTransaction,
				getTransactionValue,
				overwriteBalance,
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionProvider;
