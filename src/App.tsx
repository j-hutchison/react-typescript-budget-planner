import React from "react";
import Header from "./layout/Header";
import TransactionList from "./components/TransactionList/TransactionList";
import AddTransaction from "./components/AddTransaction/AddTransaction";

function App() {
	return (
		<div className="wrapper">
			<Header />
			<TransactionList />
			<AddTransaction />
		</div>
	);
}

export default App;
