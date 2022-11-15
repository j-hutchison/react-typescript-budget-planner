import React, { useRef } from "react";
import classes from "./AdvancedInputOptions.module.css";

interface AdvancedInputOptionsProps {
	onChangeAdvancedOptions?: (day: number, monthRepetition: number) => void;
}

const AdvancedInputOptions: React.FC<AdvancedInputOptionsProps> = (props) => {
	const recurringDayRef = useRef<HTMLInputElement>(null);
	const recurringMonthRef = useRef<HTMLInputElement>(null);

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		let inputDays = recurringDayRef.current!.value;
		let inputMonths = recurringMonthRef.current!.value;

		switch (event.currentTarget.id) {
			case "input-days":
				inputDays = inputValue;
				recurringDayRef.current!.value = inputDays;
				break;
			case "input-months":
				inputMonths = inputValue;
				recurringMonthRef.current!.value = inputMonths;
				break;
			default:
				throw new Error("Change event thrown from unknown field");
		}

		// call function
		if (!props.onChangeAdvancedOptions) return;
		props.onChangeAdvancedOptions(
			+recurringDayRef.current!.value,
			+recurringMonthRef.current!.value
		);
	};

	return (
		<div className={classes["adv-input-options"]}>
			<h3 className={classes["adv-input-heading"]}>Advanced Options</h3>
			<div className={classes["adv-inputs"]}>
				<span className={classes["adv-input"]}>
					Day{" "}
					<input
						ref={recurringDayRef}
						type="number"
						id="input-days"
						className={`${classes["input-days"]} input-border`}
						min={1}
						max={31}
						onChange={onChangeHandler}
						required
					/>{" "}
					of every{" "}
					<input
						ref={recurringMonthRef}
						type="number"
						id="input-months"
						className={`${classes["input-months"]} input-border`}
						min={1}
						max={12}
						defaultValue={1}
						onChange={onChangeHandler}
						required
					/>{" "}
					month(s)
				</span>
			</div>
		</div>
	);
};

export default AdvancedInputOptions;
