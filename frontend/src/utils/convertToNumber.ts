export function convertToNumber(n: string | undefined) {
	if (n == null || n.trim() === "") {
		return undefined;
	}
	const num = Number(n);
	const isNumeric = !Number.isNaN(num) && Number.isFinite(num);
	if (!isNumeric) return;
	return num;
}
