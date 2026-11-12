import { dateRange, duration, formatNumber, shortDate } from "./format";

test("a date range names the year once when both dates share it", () => {
  expect(dateRange("2026-06-27", "2026-07-15")).toBe("27 Jun to 15 Jul 2026");
  expect(dateRange("2025-12-30", "2026-01-02")).toBe("30 Dec 2025 to 2 Jan 2026");
});

test("dates, numbers and durations read naturally", () => {
  expect(shortDate("2026-06-30")).toBe("30 Jun");
  expect(formatNumber(14580)).toBe("14,580");
  expect(duration("7:52")).toBe("7 h 52 min");
  expect(duration("0:45")).toBe("45 min");
  expect(duration("123:05")).toBe("123 h 5 min");
});
