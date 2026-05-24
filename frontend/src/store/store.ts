import { foodItems } from "@/data/dummyData";
import { FoodItem } from "@shared/types/meal";
import { create } from "zustand";

type State = {
	foodLibrary: FoodItem[];
};

type Actions = {
	addFood: (food: FoodItem) => void;
	removeFood: (id: string) => void;
};

export const useFoodLibrary = create<State & Actions>()((set) => ({
	foodLibrary: [...foodItems],
	addFood: (food: FoodItem) =>
		set((state) => ({ foodLibrary: [...state.foodLibrary, food] })),
	removeFood: (id: string) =>
		set((state) => ({
			foodLibrary: state.foodLibrary.filter((s) => s.id !== id),
		})),
}));