import { MAX_IMAGE_DIMENSION } from "./const.js";

export function sanitizeDimension(value: unknown): number | null {
	if (value === undefined || value === null) {
		return null;
	}

	let targetValue = Array.isArray(value) ? (value as unknown[])[0] : value;

	if (typeof targetValue !== "string" && typeof targetValue !== "number") {
		return null;
	}

	if (typeof targetValue === "string") {
		targetValue = targetValue.trim();
		if (targetValue === "") {
			return null;
		}
	}

	const parsed = parseInt(targetValue as string, 10);

	if (isNaN(parsed) || parsed <= 0 || parsed > MAX_IMAGE_DIMENSION) {
		return null;
	}

	return parsed;
}
