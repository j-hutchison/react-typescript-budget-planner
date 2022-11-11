import React, { useState } from "react";
import { OutgoingTransaction, Transaction } from "../models/Transaction";
import { Filter } from "../models/Filter";

interface ITransactionContext {
	balance: number;
	transactionList: Transaction[];
	searchCriteria: string;
	isFormSubmitted: boolean;
	filters: Filter[];
	addTransaction?: (newTransaction: Transaction) => void;
	deleteTransaction?: (id: string) => void;
	getOverallSpend?: () => number;
	overwriteBalance?: (newBalance: number) => void;
	updateSearchCriteria?: (searchText: string) => void;
	updateIsFormSubmitted?: (submissionStatus: boolean) => void;
	updateFilterFlags?: (filter: Filter, removeFilter?: boolean) => void;
	filterByTransactionType?: (transaction: Transaction) => boolean;
	filterByMaxMin?: (transaction: Transaction) => boolean;
	filterByFromToDate?: (transaction: Transaction) => boolean;
}

const defaultState = {
	balance: 0,
	transactionList: [],
	searchCriteria: "",
	isFormSubmitted: false,
	filters: [],
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
		new Date("11/07/2022")
	);
	const transaction2 = new OutgoingTransaction(
		"i2",
		"Holiday",
		250,
		new Date("11/08/2022")
	);
	const transaction3 = new OutgoingTransaction(
		"i3",
		"Transporation",
		25,
		new Date("11/9/2022")
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

	// STATE AND FUNCTIONS RELATING TO BALANCE
	const [searchCriteria, setSearchCriteria] = useState("");
	const updateSearchCriteria = (searchText: string) => {
		setSearchCriteria(() => searchText);
	};

	// STATE AND FUNCTIONS RELATING TO FILTERING
	const [filters, setFilterFlags] = useState<Filter[]>([]);
	const updateFilterFlags = (filter: Filter, removeFilter?: boolean) => {
		setFilterFlags((prevValue) => {
			const existingFilters = prevValue.filter(
				(prevfilter) => prevfilter.name !== filter.name
			);
			if (removeFilter) return [...existingFilters];
			return [...existingFilters, filter];
		});
	};

	const filterByTransactionType = (transaction: Transaction) => {
		let matchingTransaction = true;
		if (filters.length > 0) {
			filters
				.filter((filter) => filter.fieldMapping === "type")
				.forEach((filter) => {
					console.log(`filterByTransactionType: ${JSON.stringify(filter)}`);
					if (filter.value === "Incoming") {
						matchingTransaction = transaction.isCredit === true;
					} else if (filter.value === "Outgoing") {
						matchingTransaction = transaction.isCredit === false;
					} else {
						matchingTransaction = true;
					}
				});
		} else {
			matchingTransaction = true;
		}
		return matchingTransaction;
	};

	const filterByMaxMin = (transaction: Transaction) => {
		let matchingTransaction = true;
		if (filters.length > 0) {
			filters
				.filter((filter) => filter.fieldMapping === "amount")
				.forEach((filter) => {
					console.log(`filterByMaxMin: ${JSON.stringify(filter)}`);
					if (filter.name === "transaction-filter-min") {
						matchingTransaction =
							matchingTransaction && transaction.amount >= filter.value;
					}
					if (filter.name === "transaction-filter-max") {
						matchingTransaction =
							matchingTransaction && transaction.amount <= filter.value;
					}
				});
		} else {
			matchingTransaction = true;
		}
		return matchingTransaction;
	};

	const filterByFromToDate = (transaction: Transaction) => {
		console.log(`filterByFromToDate`);
		let matchingTransaction = true;
		if (filters.length > 0) {
			filters
				.filter((filter) => filter.fieldMapping === "date")
				.forEach((filter) => {
					console.log(`filterByFromToDate: ${JSON.stringify(filter)}`);

					console.log(new Date(transaction.date));
					console.log(filter.value);

					if (filter.name === "transaction-filter-fromdate") {
						matchingTransaction =
							matchingTransaction && new Date(transaction.date) >= filter.value;
					}
					if (filter.name === "transaction-filter-todate") {
						matchingTransaction =
							matchingTransaction && new Date(transaction.date) <= filter.value;
					}
				});
		} else {
			matchingTransaction = true;
		}
		return matchingTransaction;
	};

	// STATE AND FUNCTIONS RELATING TO TRANSACTIONS
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const updateIsFormSubmitted = (submissionStatus: boolean) => {
		setIsFormSubmitted(() => submissionStatus);
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

	const getOverallSpend = () => {
		return transactionList.reduce((prevTransaction, currentTransaction) => {
			if (currentTransaction.isCredit) {
				return prevTransaction - currentTransaction.amount;
			} else {
				return prevTransaction + currentTransaction.amount;
			}
		}, 0);
	};

	return (
		<TransactionContext.Provider
			value={{
				balance,
				transactionList,
				searchCriteria,
				isFormSubmitted,
				filters,
				addTransaction,
				deleteTransaction,
				getOverallSpend,
				overwriteBalance,
				updateSearchCriteria,
				updateIsFormSubmitted,
				updateFilterFlags,
				filterByTransactionType,
				filterByMaxMin,
				filterByFromToDate,
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionProvider;
