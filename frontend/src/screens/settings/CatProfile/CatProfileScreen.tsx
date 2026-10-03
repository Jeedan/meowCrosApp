import React from "react";
import { Text, View } from "react-native";

function CatProfileScreen() {
	return (
		<>
			<View>
				<Text>CatProfile</Text>
			</View>
			{/*  (name, weight, age, sex, neutered, goal) */}
			<View>
				<Text>Name</Text>
			</View>
			<View>
				<Text>weight</Text>
			</View>
			<View>
				<Text>age</Text>
			</View>
			<View>
				<Text>sex</Text>
			</View>
			<View>
				<Text>neutered</Text>
			</View>
			<View>
				<Text>goal</Text>
			</View>

			{/* TODO: edit button */}
			<View>
				<Text>Edit Button</Text>
			</View>
		</>
	);
}

export default CatProfileScreen;
