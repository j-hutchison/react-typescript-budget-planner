import React from "react";
import classes from "./DeleteButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
			<FontAwesomeIcon icon={faTrash} />
		</button>
	);
};

export default DeleteButton;
