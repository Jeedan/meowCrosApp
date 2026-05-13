import { colors } from "@/styles/global";
import {
	Control,
	FieldPath,
	FieldValues,
	useController,
} from "react-hook-form";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	View,
} from "react-native";

type FormSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	labelStyle?: StyleProp<TextStyle>;
	options: { label: string; value: string }[];
	error?: string;
};

export default function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
	labelStyle,
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
			<Text style={[styles.label, labelStyle]}>{label}</Text>

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
			</View>

			{error && <Text style={styles.errors}>{error.message}</Text>}
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
		justifyContent: "space-around",
		width: "100%",
		gap: 10,
		paddingHorizontal: 14,
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
		flexWrap: "wrap",
		color: colors.alert,
		marginTop: 4,
	},

	selectButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 14,
		borderRadius: 4,
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
