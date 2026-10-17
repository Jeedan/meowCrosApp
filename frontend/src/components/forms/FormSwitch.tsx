import { colors, spacing, typography } from "@/styles/global";
import {
	FieldValues,
	Control,
	FieldPath,
	useController,
} from "react-hook-form";
import {
	StyleProp,
	StyleSheet,
	Switch,
	Text,
	View,
	ViewStyle,
} from "react-native";

type FormSwitchProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	fieldContainerStyle?: StyleProp<ViewStyle>;
	showLabel?: boolean;
};

export default function FormSwitch<T extends FieldValues>({
	control,
	name,
	label,
	fieldContainerStyle,
	showLabel = true,
}: FormSwitchProps<T>) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { error },
	} = useController({
		control,
		name,
	});
	return (
		<View style={[styles.fieldContainer, fieldContainerStyle]}>
			{showLabel ? <Text style={styles.label}>{label}</Text> : null}
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
		gap: spacing.xxl,
		marginTop: spacing.xs,
		marginBottom: spacing.lg,
	},

	label: {
		color: colors.text,
		fontSize: typography.bodyLarge,
		marginBottom: spacing.xs,
	},

	errors: {
		color: colors.alert,
		marginTop: spacing.xs,
		flexWrap: "wrap",
	},
});
