import { daysAgo } from "@/utils/dateUtils";
import { DummyCatProfile } from "@shared/index";

export const catProfile: DummyCatProfile = {
	id: "23",
	userId: "13",
	name: "Moggie",
	ageMonths: 60,
	weight: 7,
	sex: "male",
	isNeutered: true,
	goal: "lose",
	created_at: daysAgo(10),
	updated_at: daysAgo(10),
};
