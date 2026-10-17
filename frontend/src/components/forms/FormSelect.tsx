import { colors, radius, spacing, typography } from "@/styles/global";
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
	ViewStyle,
} from "react-native";

type FormSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	showLabel?: boolean;
	labelStyle?: StyleProp<TextStyle>;
	style?: StyleProp<ViewStyle>;
	options: { label: string; value: string }[];
	error?: string;
};

export default function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
	labelStyle,
	style,
	showLabel = true,
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
			{showLabel ? (
				<Text style={[styles.label, labelStyle]}>{label}</Text>
			) : null}

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
								style,
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
		marginBottom: spacing.lg,
		width: "100%",
	},

	// change row
	row: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		gap: spacing.md,
		paddingHorizontal: spacing.lg,
	},

	label: {
		color: colors.text,
		fontSize: typography.bodyLarge,
		marginBottom: spacing.xs,
	},

	inputs: {
		borderColor: colors.textSecondary,
		borderWidth: 1,
		borderRadius: radius.sm,
		color: colors.text,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},

	errors: {
		flexWrap: "wrap",
		color: colors.alert,
		marginTop: spacing.xs,
	},

	selectButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: spacing.md,
		borderRadius: radius.sm,
		marginVertical: spacing.sm,
	},

	activeSelectButton: {
		backgroundColor: colors.secondary,
	},

	inactiveSelectButton: {
		backgroundColor: colors.disabled,
	},

	buttonText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},
});
