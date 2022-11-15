import React, { useState } from "react";
import { OutgoingTransaction, Transaction } from "../models/Transaction";
import { Filter } from "../models/Filter";

interface ITransactionContext {
	balance: number;
	minBalance: number;
	transactionList: Transaction[];
	searchCriteria: string;
	isFormSubmitted: boolean;
	isTransactionRecurring: boolean;
	filters: Filter[];
	addTransaction?: (newTransaction: Transaction[]) => void;
	deleteTransaction?: (id: string) => void;
	getOverallSpend?: () => number;
	getBalanceAsOfDate?: (date: Date, fromTo: "from" | "to") => number;
	overwriteBalance?: (newBalance: number) => void;
	overwriteMinBalance?: (newBalance: number) => void;
	updateSearchCriteria?: (searchText: string) => void;
	updateIsFormSubmitted?: (submissionStatus: boolean) => void;
	updateFilterFlags?: (filter: Filter, removeFilter?: boolean) => void;
	toggleIsTransactionRecurring?: (value: boolean) => void;
	getDateFilters?: () => Filter[];
	filterByTransactionType?: (transaction: Transaction) => boolean;
	filterByMaxMin?: (transaction: Transaction) => boolean;
	filterByFromToDate?: (transaction: Transaction) => boolean;
}

const defaultState = {
	balance: 0,
	minBalance: 0,
	transactionList: [],
	searchCriteria: "",
	isFormSubmitted: false,
	isTransactionRecurring: false,
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
		-50,
		new Date("11/07/2022")
	);
	const transaction2 = new OutgoingTransaction(
		"i2",
		"Holiday",
		-250,
		new Date("11/08/2022")
	);
	const transaction3 = new OutgoingTransaction(
		"i3",
		"Transporation",
		-25,
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
	const [minBalance, setMinBalance] = useState(0);
	const overwriteMinBalance = (newBalance: number) => {
		setMinBalance(() => newBalance);
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
					if (filter.name === "transaction-filter-min") {
						matchingTransaction =
							matchingTransaction &&
							Math.abs(transaction.amount) >= filter.value;
					}
					if (filter.name === "transaction-filter-max") {
						matchingTransaction =
							matchingTransaction &&
							Math.abs(transaction.amount) <= filter.value;
					}
				});
		} else {
			matchingTransaction = true;
		}
		return matchingTransaction;
	};

	const filterByFromToDate = (transaction: Transaction) => {
		let matchingTransaction = true;
		if (filters.length > 0) {
			filters
				.filter((filter) => filter.fieldMapping === "date")
				.forEach((filter) => {
					if (filter.name === "transaction-filter-fromdate") {
						matchingTransaction =
							matchingTransaction && new Date(transaction.date) >= filter.value;
					}
					if (filter.name === "transaction-filter-todate") {
						matchingTransaction =
							matchingTransaction &&
							new Date(transaction.date).setHours(0, 0, 0, 0) <= filter.value;
					}
				});
		} else {
			const compareDate = new Date(new Date().getFullYear() + 1, 11, 31);
			matchingTransaction =
				matchingTransaction && transaction.date <= compareDate;
		}
		return matchingTransaction;
	};

	const getDateFilters = (): Filter[] => {
		return filters.filter(
			(filter) =>
				filter.name === "transaction-filter-fromdate" ||
				filter.name === "transaction-filter-todate"
		);
	};

	// STATE AND FUNCTIONS RELATING TO TRANSACTIONS
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const updateIsFormSubmitted = (submissionStatus: boolean) => {
		setIsFormSubmitted(() => submissionStatus);
	};

	const [transactionList, setTransactionList] =
		useState<Transaction[]>(transactions);

	const addTransaction = (newTransaction: Transaction[]) => {
		console.log("Adding new transaction");

		if (Array.isArray(newTransaction)) {
			setTransactionList((prevValue) => [...prevValue, ...newTransaction]);
		} else {
			setTransactionList((prevValue) => [...prevValue, newTransaction]);
		}
	};

	const deleteTransaction = (id: string): void => {
		console.log("Deleting transaction");
		setTransactionList((prevValue) =>
			prevValue.filter((transaction) => transaction.id !== id)
		);
	};

	const getOverallSpend = () => {
		return transactionList.reduce((prevTransaction, currentTransaction) => {
			return prevTransaction + currentTransaction.amount;
		}, 0);
	};

	const getBalanceAsOfDate = (date: Date, fromTo: "from" | "to"): number => {
		let result = 0;

		if (fromTo === "from") {
			const filteredTransctions = transactionList.filter(
				(transaction) => transaction.date < date
			);

			if (filteredTransctions.length === 0) return balance;

			const filteredTransactionAmount = filteredTransctions.reduce(
				(previousTransaction, currentTransaction) => {
					if (currentTransaction.amount > 0) {
						return previousTransaction + currentTransaction.amount;
					}
					return previousTransaction - Math.abs(currentTransaction.amount);
				},
				0
			);

			result =
				filteredTransactionAmount > 0
					? balance + filteredTransactionAmount
					: balance - Math.abs(filteredTransactionAmount);
		}
		if (fromTo === "to") {
			const filteredTransctions = transactionList.filter(
				(transaction) => transaction.date <= date
			);

			if (filteredTransctions.length === 0) return balance + getOverallSpend();

			const filteredTransactionAmount = filteredTransctions.reduce(
				(previousTransaction, currentTransaction) => {
					if (currentTransaction.amount > 0) {
						return previousTransaction + currentTransaction.amount;
					}
					return previousTransaction - Math.abs(currentTransaction.amount);
				},
				0
			);

			result =
				filteredTransactionAmount > 0
					? balance + filteredTransactionAmount
					: balance - Math.abs(filteredTransactionAmount);
		}

		return result;
	};

	const [isTransactionRecurring, setIsTransactionRecurring] = useState(false);
	const toggleIsTransactionRecurring = (value: boolean) =>
		setIsTransactionRecurring(() => value);

	return (
		<TransactionContext.Provider
			value={{
				balance,
				minBalance,
				transactionList,
				searchCriteria,
				isFormSubmitted,
				isTransactionRecurring,
				filters,
				addTransaction,
				deleteTransaction,
				getOverallSpend,
				getBalanceAsOfDate,
				overwriteBalance,
				overwriteMinBalance,
				updateSearchCriteria,
				updateIsFormSubmitted,
				updateFilterFlags,
				toggleIsTransactionRecurring,
				filterByTransactionType,
				filterByMaxMin,
				filterByFromToDate,
				getDateFilters,
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionProvider;
