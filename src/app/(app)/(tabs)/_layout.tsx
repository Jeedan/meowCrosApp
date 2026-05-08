import AddButton from "@/components/AddButton";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveBackgroundColor: colors.background,
				tabBarActiveBackgroundColor: colors.background,
				headerTintColor: colors.background,
				tabBarStyle: {
					overflow: "hidden",
					borderTopWidth: 1,
					borderColor: colors.background,
				},
			}}
		>
			<Tabs.Screen
				name="dashboard/index"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="home-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="mealslog"
				options={{
					title: "Meals",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="fast-food-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="addMenu/index"
				options={{
					title: "",
					tabBarButton: (props) => <AddButton {...props} />,
				}}
			/>

			<Tabs.Screen
				name="foodlibrary/index"
				options={{
					title: "Food Library",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="library-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="settings/index"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="ellipsis-horizontal-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
