import React from "react";
import Header from "./layout/Header";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
	return (
		<div className="wrapper">
			<Header />
			<TransactionList />
		</div>
	);
}

export default App;
