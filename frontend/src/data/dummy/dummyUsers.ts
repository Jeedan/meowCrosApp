// TODO: use data from backend

import { daysAgo } from "@/utils/dateUtils";

// remove the const so its not readonly to emulate updating
export const userProfile = {
	id: "13",
	name: "Jeedan",
	email: "Jeedan.Cuneyt@gmail.com",
	password: "123",
	created_at: daysAgo(10),
	updated_at: daysAgo(10),
};
