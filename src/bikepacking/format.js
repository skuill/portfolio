const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const full = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const number = new Intl.NumberFormat("en-GB");

// "27 Jun to 15 Jul 2026"; the year is written once when both dates share it.
export const dateRange = (start, end) => {
  const from = new Date(start);
  const to = new Date(end);
  return `${from.getUTCFullYear() === to.getUTCFullYear() ? day.format(from) : full.format(from)} to ${full.format(to)}`;
};

export const shortDate = (date) => day.format(new Date(date));

export const formatNumber = (value) => number.format(value);

// "7:52" (hours:minutes) as "7 h 52 min".
export const duration = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours ? `${hours} h ${minutes} min` : `${minutes} min`;
};
