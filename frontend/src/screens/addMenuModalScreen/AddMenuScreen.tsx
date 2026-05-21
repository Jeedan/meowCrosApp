import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

// TODO TURN INTO MODAL IF POSSIBLE
// at this point this is dead code
// we never navigate here
// because we have our custom modal in tabBarButton
export default function AddMenuScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={styles.title}>THE REAL MODAL SCREEN</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "600",
	},
});
