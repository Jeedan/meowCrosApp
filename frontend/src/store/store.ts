import { feedingLog } from "@/data/dummyData";
import { SelectedFoodItem } from "@/types/SelectedFood";
import { FeedingLog, FoodItem } from "@shared/types/meal";
import { create } from "zustand";
import { deleteFood, insertFood, getFoods } from "@/database/foodQueries";
import {
	deleteFeedingLog,
	deletePlateItem,
	getFeedingLogs,
	insertFeedingLog,
} from "@/database/feedingLogQueries";

type FoodState = {
	foodLibrary: FoodItem[];
	isFoodLibraryLoaded: boolean;
};

type FoodActions = {
	addFood: (food: FoodItem) => Promise<void>;
	removeFood: (id: string) => Promise<void>;
	loadFoods: () => Promise<void>;
};

// dummy data version:
// foodLibrary: [...foodItems],
export const useFoodLibrary = create<FoodState & FoodActions>()((set) => ({
	foodLibrary: [],
	isFoodLibraryLoaded: false,
	loadFoods: async () => {
		const foods = await getFoods();
		set({
			foodLibrary: foods,
			isFoodLibraryLoaded: true,
		});
	},
	addFood: async (food: FoodItem) => {
		await insertFood(food);
		set((state) => ({ foodLibrary: [...state.foodLibrary, food] }));
	},
	removeFood: async (id: string) => {
		await deleteFood(id);
		set((state) => ({
			foodLibrary: state.foodLibrary.filter((food) => food.id !== id),
		}));
	},
}));

type FeedingState = {
	feedingLog: FeedingLog[];
	isFeedingLogLoaded: boolean;
};

type FeedingActions = {
	loadFeedingLogs: () => Promise<void>;
	addMeal: (log: FeedingLog) => Promise<void>;
	removeFeeding: (id: string) => Promise<void>;
	removePlateItem: (
		feedingLogId: string,
		plateItemId: string,
	) => Promise<void>;
};

// dummy Data
// feedingLog: [...feedingLog]
export const useFeedingLog = create<FeedingState & FeedingActions>()((set) => ({
	feedingLog: [],
	isFeedingLogLoaded: false,
	loadFeedingLogs: async () => {
		const logs = await getFeedingLogs();

		set({
			feedingLog: [...logs],
			isFeedingLogLoaded: true,
		});
	},
	addMeal: async (log: FeedingLog) => {
		await insertFeedingLog(log);
		set((state) => ({
			feedingLog: [...state.feedingLog, log].sort(
				(a, b) => a.loggedAt.getTime() - b.loggedAt.getTime(),
			),
		}));
	},
	removeFeeding: async (id: string) => {
		await deleteFeedingLog(id);
		set((state) => ({
			feedingLog: state.feedingLog.filter((s) => s.id !== id),
		}));
	},
	removePlateItem: async (feedingLogId: string, plateItemId: string) => {
		await deletePlateItem(feedingLogId, plateItemId);
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
		}));
	},
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
