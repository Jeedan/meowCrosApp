import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { authClient } from "@/lib/auth-client";
import { colors } from "@/styles/global";
import { apiRequest } from "@/lib/api-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { data: session } = authClient.useSession();

	const handleSignin = async () => {
		try {
			const result = await authClient.signIn.email({
				email,
				password,
			});

			if (result.error) {
				return console.error(
					"Log in failed:",
					JSON.stringify(result, null, 2),
				);
			}

			console.log("Log in:", JSON.stringify(result.data.user, null, 2));
		} catch (err) {
			console.error(err);
		}
	};

	const handleSignout = async () => {
		try {
			const result = await authClient.signOut();
			if (result.error) {
				return console.error(
					"Log out failed:",
					JSON.stringify(result, null, 2),
				);
			}

			console.log("Log out:", JSON.stringify(result, null, 2));
		} catch (err) {
			console.error(err);
		}
	};
	// TODO: REMOVE after tanstack setup
	const apiTest = async () => {
		//const data = await apiRequest("health", "GET");
		try {
			const endpoint = "foods";
			const data = await apiRequest(endpoint, "GET");
			console.log(`GET Request on: /${endpoint}:`, JSON.stringify(data));
		} catch (err) {
			console.log("Api Test failed:", err);
		}
	};

	if (session?.session) {
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

				<Button title="Log Out" onPress={handleSignout} />
				<Button title="Test Protected Route" onPress={apiTest} />
			</View>
		);
	}

	// console.log("Session:", JSON.stringify(session, null, 2));
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				padding: 12,
			}}
		>
			<TextInput
				style={{ color: colors.text, marginBottom: 8 }}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={{ color: colors.text, marginBottom: 8 }}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
			/>
			<Button title="Login" onPress={handleSignin} />

			<Button title="Test Protected Route" onPress={apiTest} />
		</View>
	);
}
