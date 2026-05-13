import { accountCreationFormSchema, AccountFormData } from "@shared/index";
import { StyleSheet, Text, View } from "react-native";

import { useForm } from "react-hook-form";
import { colors, globalStyles } from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/forms/FormInput";
import { Link } from "expo-router";
import Button from "@/components/Button";

type StepAccountScreenProps = {
	onStepComplete: (data: AccountFormData) => void;
};

export default function StepAccountScreen({
	onStepComplete,
}: StepAccountScreenProps) {
	const { control, handleSubmit } = useForm<AccountFormData>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(accountCreationFormSchema),
	});

	return (
		<View style={styles.container}>
			<Text style={globalStyles.title}>Create your Account</Text>

			<View style={styles.inputContainer}>
				<FormInput
					name="email"
					label="Email"
					placeholder="Enter Email"
					control={control}
				/>
				<FormInput
					name="password"
					label="Password"
					placeholder="Enter Password"
					secureTextEntry={true}
					control={control}
				/>
				<FormInput
					name="confirmPassword"
					label="Confirm Password"
					placeholder="Confirm your Password"
					secureTextEntry={true}
					control={control}
				/>
			</View>

			{/* Submit button */}
			<Button
				accessibilityLabel="Create account button"
				onPress={handleSubmit(onStepComplete)}
			>
				<Text style={styles.buttonText}>Create Account</Text>
			</Button>

			<View style={styles.haveAccountContainer}>
				<Text style={styles.accountText}>Already have an account?</Text>
				<Link href={"/dashboard"} style={styles.signIn}>
					Sign in
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},

	inputContainer: {
		width: 250,
		marginTop: 30,
		marginBottom: 10,
	},

	buttonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},

	haveAccountContainer: {
		flexDirection: "row",
		gap: 4,
		marginTop: 8,
	},

	accountText: {
		fontSize: 12,
		color: colors.textSecondary,
	},

	signIn: {
		textDecorationLine: "underline",
		textDecorationStyle: "solid",
		color: colors.text,
		fontWeight: "bold",
	},
});
