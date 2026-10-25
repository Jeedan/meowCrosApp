import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { userProfile } from "@/data/dummyData";
import { colors, radius, spacing, typography } from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSettingsData, accountSettingsFormSchema } from "@shared/index";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

// input field ---- Cancel Save
// cancel and save will be icons
// when cancel is hit set "editMode" to false and just showcase the standard UI
export default function AccountScreen() {
	// grab profile info from dummy data
	const [profile, setProfile] = useState({
		name: userProfile.name ?? "",
		email: userProfile.email ?? "",
		password: "",
	});

	// TODO: hide password if the user signed up via email and password
	// set to no password if they used oAUTH
	const accountOptions = [
		{ name: "name", label: "Name", text: profile.name },
		{ name: "email", label: "Email", text: profile.email },
		{ name: "password", label: "Password", text: "********" },
	] as const;

	// fields for individual editing
	// null for normal display only
	const [editingField, setEditingField] = useState<
		"name" | "email" | "password" | null
	>(null);

	const { control, handleSubmit, resetField, getValues, trigger } =
		useForm<AccountSettingsData>({
			defaultValues: {
				name: profile.name ?? "",
				email: profile.email ?? "",
				password: "",
			},
			resolver: zodResolver(accountSettingsFormSchema),
		});

	// manually validate each input with trigger
	// otherwise we will set off zod errors requiring each fields error parsing
	async function saveField(item: (typeof accountOptions)[number]) {
		// validation
		const isValid = await trigger(item.name);
		if (!isValid) return;

		const value = getValues(item.name);

		// save and close editing
		console.log("save edit:", value);
		setProfile((prev) => ({ ...prev, [item.name]: value }));
		setEditingField(null);
	}

	// modal code
	// todo update with proper values from ZOD and backend
	const [pendingDelete, setPendingDelete] = useState<{
		userId: string;
	} | null>(null);

	const requestDelete = useCallback((userId: string) => {
		setPendingDelete({ userId });
	}, []);

	const dismissDelete = useCallback(() => {
		setPendingDelete(null);
	}, []);

	const confirmDelete = useCallback(() => {
		if (!pendingDelete) return;

		//removePlateItem(pendingDelete.feedingLogId, pendingDelete.mealId);
		// TODO: add deleteUser function
		// replace null with the function in the depency array
		console.log("sending delete request to the backend");
		setPendingDelete(null);
	}, [pendingDelete, null]);

	return (
		// keyboardVerticalOffset={100} works but white
		// keyboard offsetting isn't working
		// might need app rebuild
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: colors.background }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<Text style={styles.title}>Profile</Text>

				<View style={styles.card}>
					{accountOptions.map((item, index) => (
						<View key={item.name}>
							<Text style={styles.label}>{item.label}</Text>
							<View
								style={
									editingField === item.name
										? styles.editingContainer
										: styles.row
								}
							>
								{editingField === item.name ? (
									<>
										<FormInput
											name={item.name}
											fieldContainerStyle={
												styles.fieldContainer
											}
											inputStyle={styles.input}
											placeholder={`Enter ${item.label}`}
											keyboardType={
												item.name === "email"
													? "email-address"
													: "default"
											}
											secureTextEntry={
												item.name === "password"
											}
											control={control}
										/>
										<View style={styles.editActions}>
											<Button
												style={[
													styles.actionButton,
													styles.cancelButton,
												]}
												accessibilityRole="button"
												accessibilityLabel={`Cancel ${item.label}`}
												onPress={() => {
													resetField(item.name, {
														defaultValue:
															item.name ===
															"password"
																? ""
																: profile[
																		item
																			.name
																	],
													});
													setEditingField(null);
												}}
											>
												<Text style={styles.editText}>
													Cancel
												</Text>
											</Button>

											<Button
												style={[
													styles.actionButton,
													styles.saveButton,
												]}
												accessibilityRole="button"
												accessibilityLabel={`Save ${item.label}`}
												onPress={() => saveField(item)}
											>
												<Text style={styles.saveText}>
													Save
												</Text>
											</Button>
										</View>
									</>
								) : (
									<>
										<View style={styles.fieldContainer}>
											<Text style={styles.text}>
												{item.text}
											</Text>
										</View>

										<Button
											style={styles.editButton}
											accessibilityRole="button"
											accessibilityLabel={`Edit ${item.label}`}
											onPress={() => {
												setEditingField(item.name);
											}}
										>
											<Text style={styles.editText}>
												Edit
											</Text>
										</Button>
									</>
								)}
							</View>
							{index < accountOptions.length - 1 && (
								<View style={styles.divider} />
							)}
						</View>
					))}

					{/* TODO: Create another Modal but for logout
					  need to refactor the modal component a bit because right now its hardcoded for deletes.
						 */}
					{/* Delete Account button */}
					<View style={styles.divider} />
					<View style={styles.deleteButtonContainer}>
						<ConfirmDeleteModal
							visible={pendingDelete !== null}
							onConfirm={confirmDelete}
							onDismiss={dismissDelete}
							modalText="Do you want to delete the entry?"
						/>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: "flex-start",
		backgroundColor: colors.background,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.huge,
	},

	fieldContainer: {
		flex: 1,
		width: undefined,
		marginBottom: spacing.none,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: radius.lg,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
	},

	title: {
		fontSize: typography.title,
		color: colors.text,
		marginTop: spacing.xl,
		marginBottom: spacing.lg,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 56,
		gap: spacing.sm,
	},

	input: {
		fontSize: typography.body,
		paddingVertical: spacing.sm,
	},

	label: {
		fontSize: typography.bodyLarge,
		color: colors.text,
		fontWeight: "bold",
		marginTop: spacing.lg,
	},

	text: {
		fontSize: typography.bodyLarge,
		fontWeight: "300",
		color: colors.text,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		marginTop: spacing.xxs,
	},

	editingContainer: {
		width: "100%",
		paddingVertical: spacing.sm,
	},

	editActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: spacing.md,
		marginTop: spacing.md,
	},

	editButton: {
		alignItems: "center",
		justifyContent: "center",
		minWidth: 44,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.xl,
		backgroundColor: colors.cardForeGround,
		marginTop: spacing.none,
	},

	editText: {
		fontSize: typography.body,
		color: colors.text,
	},

	actionButton: {
		minWidth: 96,
		minHeight: 44,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
		borderRadius: radius.md,
		alignItems: "center",
		justifyContent: "center",
	},

	cancelButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: colors.textSecondary,
	},

	saveButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.xl,
		backgroundColor: colors.text,
		marginTop: spacing.none,
	},

	cancelButtonText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},

	saveText: {
		color: colors.background,
		fontSize: typography.body,
		fontWeight: "600",
	},

	deleteButtonContainer: {
		alignItems: "center",
		paddingBottom: spacing.lg,
		marginTop: spacing.lg,
	},

	deleteAccountButton: {
		width: "auto",
		backgroundColor: colors.alert,
	},

	deleteText: {
		fontSize: typography.title,
		fontWeight: "bold",
		color: colors.text,
	},
});
