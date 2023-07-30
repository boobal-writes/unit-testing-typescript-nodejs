import { toUppercase } from "../app/Utils";

describe("Utils test suite", () => {
  test("should return uppercase", () => {
    const result = toUppercase("abc");
    expect(result).toBe("ABC");
  });
});
