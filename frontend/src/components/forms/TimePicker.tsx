import { StyleSheet, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import Button from "../Button";
import { colors } from "@/styles/global";
import { useState } from "react";
import {
	Control,
	FieldPath,
	FieldValues,
	useController,
} from "react-hook-form";

type TimePickerProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
};

export default function TimePicker<T extends FieldValues>({
	control,
	name,
	label,
}: TimePickerProps<T>) {
	const {
		field: { onChange, onBlur, value },
	} = useController({
		control,
		name,
	});

	const showTimepicker = () => {
		showMode("time");
	};

	// TODO
	const timeStringToDate = (time: string) => {
		if (!time) return new Date();
		const [hours, minutes] = time.split(":").map(Number);
		const date = new Date();
		date.setHours(hours, minutes, 0, 0);
		return date;
	};

	// TODO
	const dateToTimeString = (date: Date) => {
		//we want 2 values HH 07:00 but date only returns 7
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	//const defaultDate = timeStringToDate(value);
	//console.log("defaultDate: ", defaultDate);
	const [date, setDate] = useState(timeStringToDate(value));
	// TODO
	// set the local state Date variable
	// convert the local state variable to string
	// for Zod validation and storage
	// pass string to value from useController
	const setDateHandler = (selectedDate: Date) => {
		setDate(selectedDate);
		onChange(dateToTimeString(selectedDate));
		console.log(dateToTimeString(selectedDate));
	};

	const showMode = (currentMode: "date" | "time") => {
		DateTimePickerAndroid.open({
			value: date,
			onChange: (event, selectedDate) => {
				if (selectedDate) setDateHandler(selectedDate);
			},
			mode: currentMode,
			is24Hour: true,
		});
	};

	return (
		<View>
			<Button style={styles.buttonContainer} onPress={showTimepicker}>
				<View style={styles.row}>
					<Text style={styles.labelText}>{label}</Text>
					<Text style={styles.labelText}>{value}</Text>
				</View>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	buttonContainer: {
		backgroundColor: colors.disabled,
		width: "auto",
	},
	labelText: {
		color: colors.text,
		fontSize: 18,
	},
});
