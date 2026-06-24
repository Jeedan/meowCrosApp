// Math.floor(Math.random()* (max-min + 1)) + min
// return a random number between 2 values
export function randomRange(min: number = 0, max: number) {
	const range = max - min + 1;
	return Math.floor(Math.random() * range) + min;
}
