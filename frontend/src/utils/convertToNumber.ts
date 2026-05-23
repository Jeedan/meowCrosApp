export function convertToNumber(n: string | undefined) {
	if (!n) {
		return undefined;
	}
	const num = Number(n);
	const isNumeric = !Number.isNaN(num) && Number.isFinite(num);
	if (!isNumeric) return;
	return num;
}
