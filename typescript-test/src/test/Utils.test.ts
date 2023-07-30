import { toUppercase } from "../app/Utils";

describe("Utils test suite", () => {
  it("should return uppercase of string when valid string is passed", () => {
    const expected = "ABC";

    const actual = toUppercase("abc");

    expect(actual).toBe(expected);
  });
});
