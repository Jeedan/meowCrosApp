import { colors } from "@/styles/global";
import {
	FieldValues,
	Path,
	RegisterOptions,
	useController,
} from "react-hook-form";
import {
	KeyboardTypeOptions,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Control, FieldPath } from "react-hook-form";
import { convertToNumber } from "@/utils/convertToNumber";
import { useState } from "react";

type FormInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	placeholder: string;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions | undefined;
	rules?: Omit<
		RegisterOptions<T, Path<T>>,
		"setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
	>;
};

export default function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	secureTextEntry = false,
	keyboardType = "default",
	rules,
}: FormInputProps<T>) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { error },
	} = useController({
		control,
		name,
		rules,
	});
	const isNumeric = keyboardType === "numeric";

	const [displayString, setDisplayString] = useState(String(value ?? ""));

	const converedToNumber = (text: string) => {
		if (isNumeric) {
			const num = text === "" ? undefined : convertToNumber(text);

			onChange(num);
		} else {
			onChange(text);
		}
	};

	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.inputs}
				placeholder={placeholder}
				placeholderTextColor={colors.textSecondary}
				secureTextEntry={secureTextEntry}
				onBlur={() => {
					onBlur();
				}}
				onChangeText={(text) => {
					setDisplayString(text);
					converedToNumber(text);
				}}
				value={displayString}
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
