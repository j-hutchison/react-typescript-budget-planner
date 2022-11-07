import React from "react";
import classes from "./Searchbar.module.css";

const Searchbar = () => {
	return (
		<input
			type="text"
			id={classes["searchbar"]}
			className={"input-border"}
			placeholder="Type to search..."
		/>
	);
};

export default Searchbar;
