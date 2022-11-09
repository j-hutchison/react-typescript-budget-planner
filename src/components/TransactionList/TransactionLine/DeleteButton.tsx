import React from "react";
import classes from "./DeleteButton.module.css";

interface DeleteButtonProps {
	id: string;
	onClickHandler: (id: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
	const deleteBtnClickHandler = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		console.log(event);
		props.onClickHandler(props.id);
	};

	return (
		<button className={classes["delete-btn"]} onClick={deleteBtnClickHandler}>
			X
		</button>
	);
};

export default DeleteButton;
