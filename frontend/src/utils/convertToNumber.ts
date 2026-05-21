export function convertToNumber(n: string) {
	const num = Number(n);
	const isNumeric = !Number.isNaN(num) && Number.isFinite(num);
	if (!isNumeric) return;
	return num;
}
