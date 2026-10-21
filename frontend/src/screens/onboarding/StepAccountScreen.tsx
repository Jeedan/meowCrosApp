import { accountCreationFormSchema, AccountFormData } from "@shared/index";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { colors, globalStyles, spacing, typography } from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

type StepAccountScreenProps = {
	onStepComplete: (data: AccountFormData) => void;
};

export default function StepAccountScreen({
	onStepComplete,
}: StepAccountScreenProps) {
	const router = useRouter();

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

			{/* TODO sign in with the backend when ready */}
			<View style={styles.haveAccountContainer}>
				<Text style={styles.accountText}>Already have an account?</Text>
				<Pressable onPress={() => router.replace("/dashboard")}>
					<Text style={styles.signIn}>Sign in</Text>
				</Pressable>
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
		marginTop: spacing.xxxl,
		marginBottom: spacing.md,
	},

	buttonText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},

	haveAccountContainer: {
		flexDirection: "row",
		gap: spacing.xs,
		marginTop: spacing.sm,
	},

	accountText: {
		fontSize: typography.caption,
		color: colors.textSecondary,
	},

	signIn: {
		textDecorationLine: "underline",
		textDecorationStyle: "solid",
		color: colors.text,
		fontWeight: "bold",
	},
});
