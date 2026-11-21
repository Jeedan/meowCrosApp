import { colors } from "@/styles/global";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const { data: session } = authClient.useSession();

	const handleSignUp = async () => {
		try {
			const result = await authClient.signUp.email({
				email,
				password,
				name,
			});
			console.log("Signup response:", JSON.stringify(result, null, 2));

			if (result.error) {
				return console.error(
					"Sign up failed",
					JSON.stringify(result.error, null, 2),
				);
			}

			console.log(
				"Signup successful:",
				JSON.stringify(result.data, null, 2),
			);
		} catch (err) {
			console.error("Signup request failed:", err);
		}
	};

	if (session?.user)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 12,
				}}
			>
				<Text
					style={{
						color: colors.text,
						fontSize: 24,
						marginBottom: 8,
					}}
				>
					Welcome, {session?.user.name}
				</Text>
			</View>
		);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				padding: 12,
			}}
		>
			<TextInput
				style={{ color: colors.text }}
				placeholder="Name"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={{ color: colors.text }}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={{ color: colors.text }}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
			/>
			<Button title="Sign Up" onPress={handleSignUp} />
		</View>
	);
}
