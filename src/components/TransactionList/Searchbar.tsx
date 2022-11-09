import React, { useState, useContext } from "react";
import classes from "./Searchbar.module.css";
import { TransactionContext } from "../../context/TransactionContext";

const Searchbar = () => {
	const { searchCriteria, updateSearchCriteria, searchTransactionsByMemo } =
		useContext(TransactionContext);

	const onSearchChangeHandler = (
		searchEvent: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!updateSearchCriteria) return;
		updateSearchCriteria(searchEvent.target.value);
	};

	return (
		<input
			type="text"
			id={classes["searchbar"]}
			value={searchCriteria}
			className={"input-border"}
			placeholder="Type to search..."
			onChange={onSearchChangeHandler}
		/>
	);
};

export default Searchbar;
