import { accountCreationFormSchema, AccountFormData } from "@shared/index";
import { Button, StyleSheet, Text, View } from "react-native";

import { useForm } from "react-hook-form";
import { colors, globalStyles } from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import { Link } from "expo-router";
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
	} = useForm<AccountFormData>({
		defaultValues: {
			email: defaultValues.email,
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
					error={errors.email?.message}
				/>
				<FormInput
					name="password"
					label="Password"
					placeholder="Enter Password"
					control={control}
					error={errors.password?.message}
				/>
				<FormInput
					name="confirmPassword"
					label="Confirm Password"
					placeholder="Confirm your Password"
					control={control}
					error={errors.confirmPassword?.message}
				/>
			</View>
			<Button
				title="Create Accounr"
				color={colors.primary}
				accessibilityLabel="Create account button"
				onPress={handleSubmit(onStepComplete)}
			/>
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
		marginTop: 30,
		marginBottom: 10,
	},

	submitButton: {
		backgroundColor: colors.primary,
		borderRadius: 5,
	},

	haveAccountContainer: {
		marginTop: 8,
		color: colors.textSecondary,
		flexDirection: "row",
		gap: 4,
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
