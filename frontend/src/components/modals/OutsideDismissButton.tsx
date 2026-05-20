import { Pressable, StyleSheet, View } from "react-native";

type OutsideDismissButtonProps = {
	onPress: () => void;
};

export default function OutsideDismissButton({
	onPress,
}: OutsideDismissButtonProps) {
	return (
		<>
			{/* hack to dismiss modal if clicked outside of it */}
			<View style={styles.outsideOfModalContainer}>
				<Pressable
					style={styles.outofBoundsButton}
					onPress={onPress}
				></Pressable>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	outsideOfModalContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		height: "48%",
		marginBottom: 10,
		marginTop: 10,
	},
	outofBoundsButton: {
		flex: 1,
		width: "100%",
		marginBottom: 10,
		marginTop: 10,
	},
});
