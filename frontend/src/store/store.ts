import { legacy_feedingLog, foodItems, feedingLog } from "@/data/dummyData";
import { FeedingLog, FoodItem, PlateItem } from "@shared/types/meal";
import { create } from "zustand";

type FoodState = {
	foodLibrary: FoodItem[];
};

type FoodActions = {
	addFood: (food: FoodItem) => void;
	removeFood: (id: string) => void;
};

export const useFoodLibrary = create<FoodState & FoodActions>()((set) => ({
	foodLibrary: [...foodItems],
	addFood: (food: FoodItem) =>
		set((state) => ({ foodLibrary: [...state.foodLibrary, food] })),
	removeFood: (id: string) =>
		set((state) => ({
			foodLibrary: state.foodLibrary.filter((s) => s.id !== id),
		})),
}));

type FeedingState = {
	feedingLog: FeedingLog[];
};

type FeedingActions = {
	addMeal: (log: FeedingLog) => void;
	removeMeal: (id: string) => void;
};

export const useFeedingLog = create<FeedingState & FeedingActions>()((set) => ({
	feedingLog: [...feedingLog],
	addMeal: (log: FeedingLog) =>
		set((state) => ({ feedingLog: [...state.feedingLog, log] })),
	removeMeal: (id: string) =>
		set((state) => ({
			feedingLog: state.feedingLog.filter((s) =>
				s.plate.filter((p) => p.foodId !== id),
			),
		})),
}));
