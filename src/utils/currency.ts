export function toStripeAmount(amountInEuros: number): number {
	if (typeof amountInEuros !== "number" || isNaN(amountInEuros)) {
		return 0;
	}
	return Math.round(amountInEuros * 100);
}

export function formatAmount(amountInEuros: number, withCurrency: boolean = true): string {
	const normalized = typeof amountInEuros === "number" && !isNaN(amountInEuros) ? amountInEuros : 0;
	if (!withCurrency) {
		return normalized.toFixed(2);
	}
	return new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(normalized);
}


