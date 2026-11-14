import { duration, formatNumber } from "./format";

// The numbers of one day, or of the whole trip when no day is chosen. Only what the track recorded is shown.
// A rest day has no track: it only says so.
export const dayNumbers = (day) =>
  !day.km ? [["Distance", "Rest day"]] : [
    ["Distance", `${day.km} km`],
    ["Climbing", `${formatNumber(day.up)} m`],
    ["Moving", duration(day.moving)],
    day.elapsed && ["On the road", duration(day.elapsed)],
    day.speed && ["Average speed", `${day.speed} km/h`],
    day.highest !== undefined && ["Highest point", `${formatNumber(day.highest)} m`],
    day.temp && ["Temperature", `${day.temp[0]} to ${day.temp[1]} °C`],
    day.hr && ["Average heart rate", `${day.hr} bpm`],
  ].filter(Boolean);

const minutes = (time) => {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
};

export const tripNumbers = (trip) => {
  const moving = trip.days.reduce((sum, day) => sum + minutes(day.moving), 0);
  const highest = Math.max(...trip.days.map((day) => day.highest ?? -Infinity));
  const riding = trip.days.filter((day) => day.km).length;
  const longest = trip.days.reduce((best, day) => (day.km > best.km ? day : best), trip.days[0]);
  return [
    ["Distance", `${formatNumber(trip.km)} km`],
    ["Climbing", `${formatNumber(trip.up)} m`],
    ["Moving", duration(`${Math.floor(moving / 60)}:${String(moving % 60).padStart(2, "0")}`)],
    ["Per day", `${Math.round(trip.km / riding)} km`],
    ["Longest day", `${Math.round(longest.km)} km, day ${longest.number}`],
    Number.isFinite(highest) && ["Highest point", `${formatNumber(highest)} m`],
  ].filter(Boolean);
};
