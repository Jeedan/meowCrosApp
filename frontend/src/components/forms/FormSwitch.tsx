import { colors } from "@/styles/global";
import {
	FieldValues,
	Control,
	FieldPath,
	useController,
} from "react-hook-form";
import { StyleSheet, Switch, Text, View } from "react-native";

type FormSwitchProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
};

export default function FormSwitch<T extends FieldValues>({
	control,
	name,
	label,
}: FormSwitchProps<T>) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { error },
	} = useController({
		control,
		name,
	});
	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.label}>{label}</Text>
			<Switch
				onBlur={onBlur}
				accessibilityLabel={label}
				trackColor={{ false: "#767577", true: "#81e6ffff" }}
				thumbColor={value ? "#23d3ffff" : "#a5b9b7ff"}
				onValueChange={onChange}
				value={!!value}
			/>
			{error && <Text style={styles.errors}>{error.message}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	fieldContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 24,
		marginBottom: 16,
		marginTop: 4,
	},

	label: {
		color: colors.text,
		fontSize: 18,
		marginBottom: 4,
	},

	errors: {
		color: colors.alert,
		marginTop: 4,
		flexWrap: "wrap",
	},
});
