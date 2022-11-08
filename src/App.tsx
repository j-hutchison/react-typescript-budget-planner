import React from "react";

// Context
import TransactionProvider from "./context/TransactionContext";

// Components
import Header from "./layout/Header";
import TransactionList from "./components/TransactionList/TransactionList";
import AddTransaction from "./components/AddTransaction/AddTransaction";

function App() {
	return (
		<div className="wrapper">
			<Header />
			<TransactionProvider>
				<TransactionList />
			</TransactionProvider>
			<AddTransaction />
		</div>
	);
}

export default App;
