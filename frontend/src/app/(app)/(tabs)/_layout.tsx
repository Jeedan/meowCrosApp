import OpenFoodMenuModalButton from "@/components/OpenFoodMenuModalButton";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveBackgroundColor: colors.cardBackground,
				tabBarActiveBackgroundColor: colors.cardBackground,
				headerTintColor: colors.cardBackground,
				tabBarStyle: {
					overflow: "hidden",
					borderTopWidth: 0.2,
					borderColor: colors.textSecondary,
					backgroundColor: colors.cardBackground,
				},
			}}
		>
			<Tabs.Screen
				name="dashboard/index"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "home-sharp" : "home-outline"}
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="mealslog"
				options={{
					title: "Meals",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={
								focused
									? "fast-food-sharp"
									: "fast-food-outline"
							}
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
					tabBarButton: (props) => (
						<OpenFoodMenuModalButton {...props} />
					),
				}}
			/>

			<Tabs.Screen
				name="foodlibrary/index"
				options={{
					title: "Food Library",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "library-sharp" : "library-outline"}
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
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={
								focused
									? "ellipsis-horizontal-sharp"
									: "ellipsis-horizontal-outline"
							}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
