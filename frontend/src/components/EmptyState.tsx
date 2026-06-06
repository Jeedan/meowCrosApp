import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
	label: string;
};

export default function EmptyState({ label }: EmptyStateProps) {
	return <Text style={globalStyles.sectionTitle}>{label}</Text>;
}
