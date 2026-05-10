import { accountCreationFormSchema, AccountFormData } from "@shared/index";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { colors } from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
type StepAccountScreenProps = {
	defaultValues: Pick<AccountFormData, "email">;
	onStepComplete: (data: AccountFormData) => void;
};

export default function StepAccountScreen({
	defaultValues,
	onStepComplete,
}: StepAccountScreenProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: defaultValues.email,
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(accountCreationFormSchema),
	});

	return (
		<View>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.inputs}
						placeholder="email"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
				name="email"
			/>

			{errors.email && (
				<Text style={styles.errors}>{errors.email.message}</Text>
			)}

			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.inputs}
						secureTextEntry={true}
						placeholder="enter a password"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
				name="password"
			/>
			{errors.password && (
				<Text style={styles.errors}>{errors.password.message}</Text>
			)}

			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.inputs}
						secureTextEntry={true}
						placeholder="confirm the password"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
				name="confirmPassword"
			/>

			{errors.confirmPassword && (
				<Text style={styles.errors}>
					{errors.confirmPassword.message}
				</Text>
			)}

			<Button title="Submit" onPress={handleSubmit(onStepComplete)} />
		</View>
	);
}

const styles = StyleSheet.create({
	inputs: {
		borderColor: colors.textSecondary,
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 5,
		color: colors.text,
		width: 200,
	},

	errors: {
		color: colors.alert,
	},
});
