import { useState } from "react";
import { View, TextInput, Button } from "react-native";
// import { authClient } from "@/lib/authClient";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		// await authClient.signUp.email({
		// 	email,
		// 	password,
		// 	name,
		// });

		console.log("Sign up pressed", { email, name, password });
	};

	return (
		<View>
			<TextInput placeholder="Name" value={name} onChangeText={setName} />
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
}
