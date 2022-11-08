import React, { useState } from "react";
import { OutgoingTransaction, Transaction } from "../models/Transaction";

interface ITransactionContext {
	transactionList: Transaction[];
	addTransaction?: (newTransaction: Transaction) => void;
}

const defaultState = {
	transactionList: [],
	addTransaction: (newTransaction: Transaction): void => {},
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

	const [transactionList, setTransactionList] =
		useState<Transaction[]>(transactions);

	const addTransaction = (newTransaction: Transaction) => {
		setTransactionList((prevValue) => [...prevValue, newTransaction]);
	};

	const deleteTransaction = (): void => {};

	return (
		<TransactionContext.Provider value={{ transactionList, addTransaction }}>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionProvider;
