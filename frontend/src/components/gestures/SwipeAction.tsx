import { StyleSheet } from "react-native";
import Reanimated, {
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

type SwipeActionProps = {
	prog: SharedValue<number>;
	renderContent: () => React.ReactNode;
};

// action for swipeable
export default function SwipeAction({ prog, renderContent }: SwipeActionProps) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				prog.value,
				[0, 1],
				[0, 1],
				Extrapolation.CLAMP,
			),
			transform: [
				{
					scale: interpolate(
						prog.value,
						[0, 1],
						[0.8, 1],
						Extrapolation.CLAMP,
					),
				},
			],
		};
	});
	return (
		<Reanimated.View style={[styles.container, styleAnimation]}>
			{renderContent()}
		</Reanimated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 12,
		gap: 8,
	},
});
