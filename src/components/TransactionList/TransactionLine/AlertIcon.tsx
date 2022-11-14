import React from "react";
import classes from "./AlertIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface AlertIconProps {
	tooltip: string;
}

const AlertIcon: React.FC<AlertIconProps> = (props) => {
	return (
		<div className={classes["alert"]}>
			<FontAwesomeIcon icon={faTriangleExclamation} />
			<span className={classes["alert-tooltip"]}>{props.tooltip}</span>
		</div>
	);
};

export default AlertIcon;
