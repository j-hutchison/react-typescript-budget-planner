import React from "react";
import classes from "./DeleteButton.module.css";

interface DeleteButtonProps {
	id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
	return <button className={classes["delete-btn"]}>X</button>;
};

export default DeleteButton;
