export function money(usd: number): string {
  // A per-stage cache cost is often a fraction of a cent; "$0.00" would read as free.
  if (usd > 0 && usd < 0.005) return "<$0.01";
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
