import { colors } from "@/styles/global";
import { AccountFormData } from "@shared/index";
import { Controller, FieldValues } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Control, FieldPath } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	placeholder: string;
	secureTextEntry?: boolean;
	error?: string;
};

export default function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	secureTextEntry = false,
	error,
}: FormInputProps<T>) {
	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.label}>{label}</Text>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.inputs}
						placeholder={placeholder}
						placeholderTextColor={colors.textSecondary}
						secureTextEntry={secureTextEntry}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value?.toString()}
						accessibilityLabel={label}
						autoCapitalize="none"
						autoCorrect={false}
					/>
				)}
			/>
			{error && <Text style={styles.errors}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	fieldContainer: {
		marginBottom: 16,
		width: 250,
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
});
