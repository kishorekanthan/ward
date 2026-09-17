export function money(usd: number): string {
  if (usd < 10) {
    return usd.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return `$${Math.round(usd).toLocaleString("en-US")}`;
}
