// A small trip in the shape scripts/import_trips.py writes, for the bikepacking tests.
const photo = (name) => ({ name, width: 1080, height: 1440, blur: `data:${name}` });

export const testTrip = {
  slug: "test-trip",
  title: "Test Trip",
  intro: "Three days of test gravel.",
  start: "2026-06-27",
  end: "2026-06-29",
  km: 250,
  up: 1800,
  cover: "d02-01",
  days: [
    {
      number: 1, date: "2026-06-27", title: "Start", km: 80.5, up: 600, moving: "5:10", elapsed: "8:00", speed: 15.6,
      highest: 120, lowest: 10, temp: [15, 24], hr: 101, profile: [[0, 10], [40, 120], [80.5, 30]],
      story: ["Day one, first paragraph.", "Day one, second paragraph."], photos: [photo("d01-01"), photo("d01-02")],
    },
    {
      number: 2, date: "2026-06-28", title: "", km: 120.2, up: 900, moving: "7:52",
      story: ["Day two."], photos: [photo("d02-01"), photo("d02-02"), photo("d02-03")],
    },
    {
      number: 3, date: "2026-06-29", title: "Home", km: 49.3, up: 300, moving: "3:05",
      story: [], photos: [],
    },
  ],
};

export const testRoute = [
  [[17.6, 59.2], [17.5, 59.1]],
  [[17.5, 59.1], [17.0, 58.9]],
  [[17.0, 58.9], [17.6, 59.2]],
];
