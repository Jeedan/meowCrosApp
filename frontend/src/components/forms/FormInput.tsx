import { colors } from "@/styles/global";
import { FieldValues, useController } from "react-hook-form";
import {
	KeyboardTypeOptions,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Control, FieldPath } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	placeholder: string;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions | undefined;
};

export default function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	secureTextEntry = false,
	keyboardType = "default",
}: FormInputProps<T>) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { error },
	} = useController({
		control,
		name,
	});
	const isNumeric = keyboardType === "numeric";

	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.inputs}
				placeholder={placeholder}
				placeholderTextColor={colors.textSecondary}
				secureTextEntry={secureTextEntry}
				onBlur={onBlur}
				onChangeText={(text) => {
					if (isNumeric) {
						const num = text === "" ? undefined : Number(text);
						onChange(num);
					} else {
						onChange(text);
					}
				}}
				value={String(value ?? "")}
				keyboardType={keyboardType}
				accessibilityLabel={label}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			{error && <Text style={styles.errors}>{error.message}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	fieldContainer: {
		marginBottom: 16,
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
});
