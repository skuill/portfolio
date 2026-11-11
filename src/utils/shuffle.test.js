import { shuffle } from "./shuffle";

afterEach(() => vi.restoreAllMocks());

test("reorders by the random draws, keeps every item and leaves the original list alone", () => {
  const original = ["a", "b", "c", "d"];
  // i = 3 takes j = 0, i = 2 takes j = 1, i = 1 takes j = 1.
  vi.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0.5).mockReturnValueOnce(0.9);

  expect(shuffle(original)).toEqual(["d", "c", "b", "a"]);
  expect(original).toEqual(["a", "b", "c", "d"]);
});
