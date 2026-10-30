//import * as Crypto from "expo-crypto";

import { randomRange } from "@/utils/random";

let dummyId = 200;

// export function createUUID(): string {
// 	let uuid = Crypto.randomUUID();
// 	console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
// 	return uuid;
// }

export function incrementId() {
	const increment = randomRange(1, 10000);
	dummyId += increment + 1;
	// console.log(`dummyId: `, dummyId);

	//console.trace("incrementId called. Id: ", dummyId.toString());
	return dummyId.toString();
}
