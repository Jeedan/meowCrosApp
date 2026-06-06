import { SelectedFoodItem } from "./SelectedFood";

export type PlateFormItem = SelectedFoodItem & { gramsServed: number };
export type AddMealForm = {
	plateArray: PlateFormItem[];
};
