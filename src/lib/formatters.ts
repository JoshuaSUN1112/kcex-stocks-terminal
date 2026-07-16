export const formatNumber = (value: number | null | undefined, digits = 2) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
};

export const formatPrice = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  return `$${formatNumber(value, 2)}`;
};

export const formatPct = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatNumber(value, 2)}%`;
};

export const formatVolume = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  if (value >= 1_000_000_000) return `${formatNumber(value / 1_000_000_000, 2)}B`;
  if (value >= 1_000_000) return `${formatNumber(value / 1_000_000, 2)}M`;
  if (value >= 1_000) return `${formatNumber(value / 1_000, 2)}K`;
  return formatNumber(value, 0);
};

export const formatMktCap = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  if (value >= 1_000_000_000_000) return `$${formatNumber(value / 1_000_000_000_000, 2)}T`;
  if (value >= 1_000_000_000) return `$${formatNumber(value / 1_000_000_000, 2)}B`;
  return `$${formatNumber(value / 1_000_000, 2)}M`;
};
