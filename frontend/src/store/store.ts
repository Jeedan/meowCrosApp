import { foodItems, feedingLog } from "@/data/dummyData";
import { SelectedFoodItem } from "@/types/SelectedFood";
import { FeedingLog, FoodItem } from "@shared/types/meal";
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
	removePlateItem: (feedingLogId: string, plateItemId: string) => void;
};

export const useFeedingLog = create<FeedingState & FeedingActions>()((set) => ({
	feedingLog: [...feedingLog],
	addMeal: (log: FeedingLog) =>
		set((state) => ({ feedingLog: [...state.feedingLog, log] })),
	removeMeal: (id: string) =>
		set((state) => ({
			feedingLog: state.feedingLog.filter((s) => s.id !== id),
		})),
	removePlateItem: (feedingLogId: string, plateItemId: string) =>
		set((state) => ({
			feedingLog: state.feedingLog.flatMap((log) => {
				if (log.id !== feedingLogId) {
					return [log];
				}

				// remove meal
				const updatedPlate = log.plate.filter(
					(item) => item.id !== plateItemId,
				);

				// No meals left then we remove the feedinglog entry
				if (updatedPlate.length === 0) {
					return [];
				}

				return [
					{
						...log,
						plate: updatedPlate,
					},
				];
			}),
		})),
}));

type SelectedFoodState = {
	selectedFood: SelectedFoodItem | null;
};

type SelectedFoodActions = {
	addSelectedFood: (selected: SelectedFoodItem) => void;
	clearSelectedFood: () => void;
};

export const useSelectedFood = create<
	SelectedFoodState & SelectedFoodActions
>()((set) => ({
	selectedFood: null,
	addSelectedFood: (selected: SelectedFoodItem) =>
		set({ selectedFood: selected }),
	clearSelectedFood: () => set({ selectedFood: null }),
}));
