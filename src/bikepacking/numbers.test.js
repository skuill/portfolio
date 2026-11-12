import { dayNumbers, tripNumbers } from "./numbers";
import { testTrip } from "./testTrip";

test("a day shows everything its track recorded", () => {
  expect(dayNumbers(testTrip.days[0])).toEqual([
    ["Distance", "80.5 km"],
    ["Climbing", "600 m"],
    ["Moving", "5 h 10 min"],
    ["On the road", "8 h 0 min"],
    ["Average speed", "15.6 km/h"],
    ["Highest point", "120 m"],
    ["Temperature", "15 to 24 °C"],
    ["Average heart rate", "101 bpm"],
  ]);
});

test("a day without a detailed track shows only its distance, climbing and moving time", () => {
  expect(dayNumbers(testTrip.days[1])).toEqual([
    ["Distance", "120.2 km"],
    ["Climbing", "900 m"],
    ["Moving", "7 h 52 min"],
  ]);
});

test("the whole trip adds up its days", () => {
  expect(tripNumbers(testTrip)).toEqual([
    ["Distance", "250 km"],
    ["Climbing", "1,800 m"],
    ["Moving", "16 h 7 min"],
    ["Per day", "83 km"],
    ["Longest day", "120 km, day 2"],
    ["Highest point", "120 m"],
  ]);
});
