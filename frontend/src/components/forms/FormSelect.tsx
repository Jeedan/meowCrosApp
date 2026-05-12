import { colors } from "@/styles/global";
import {
	Control,
	FieldPath,
	FieldValues,
	useController,
} from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FormSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	options: { label: string; value: string }[];
	error?: string;
};

export default function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
}: FormSelectProps<T>) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { error },
	} = useController({
		control,
		name,
	});
	return (
		<>
			<Text style={styles.label}>{label}</Text>

			<View style={styles.row}>
				{options.map((option) => {
					const selected = value === option.value;

					return (
						<Pressable
							key={option.value}
							onPress={() => onChange(option.value)}
							style={[
								styles.selectButton,
								selected
									? styles.activeSelectButton
									: styles.inactiveSelectButton,
							]}
						>
							<Text style={styles.buttonText}>
								{option.label}
							</Text>
						</Pressable>
					);
				})}
				{error && <Text style={styles.errors}>{error.message}</Text>}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	fieldContainer: {
		marginBottom: 16,
		width: "100%",
	},

	// change row
	row: {
		flexDirection: "row",
		gap: 20,
		justifyContent: "space-around",
		width: "100%",
	},

	label: {
		color: colors.text,
		fontSize: 18,
		marginBottom: 4,
	},

	inputs: {
		borderColor: colors.textSecondary,
		borderWidth: 1,
		borderRadius: 5,
		color: colors.text,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},

	errors: {
		color: colors.alert,
		marginTop: 4,
		flexWrap: "wrap",
	},

	selectButton: {
		flex: 1,
		paddingVertical: 14,
		borderRadius: 4,
		alignItems: "center",
		marginVertical: 8,
	},

	activeSelectButton: {
		backgroundColor: colors.secondary,
	},

	inactiveSelectButton: {
		backgroundColor: colors.disabled,
	},

	buttonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},
});
