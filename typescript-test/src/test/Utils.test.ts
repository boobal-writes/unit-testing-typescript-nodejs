import { getStringInfo, toUppercase } from "../app/Utils";

describe("Utils test suite", () => {
  it("should return uppercase of string when valid string is passed", () => {
    const expected = "ABC";

    const actual = toUppercase("abc");

    expect(actual).toBe(expected);
  });

  describe("when getStringInfo is called with valid string, then", () => {
    it("should return right length", () => {
      const actual = getStringInfo("Test");

      expect(actual.length).toBe(4);
    });
    it("should return right upper case", () => {
      const actual = getStringInfo("Test");

      expect(actual.upperCase).toBe("TEST");
    });
    it("should return right lower case", () => {
      const actual = getStringInfo("Test");

      expect(actual.lowerCase).toBe("test");
    });
    it("should return right characters array", () => {
      const actual = getStringInfo("Test");

      expect(actual.characters).toEqual(["T", "e", "s", "t"]);
      expect(actual.characters).toHaveLength(4);
      expect(actual.characters).toContain("T");
      expect(actual.characters).toEqual(
        expect.arrayContaining(["e", "s", "t", "T"])
      );
    });
    it("should return defined extra info", () => {
      const actual = getStringInfo("Test");

      expect(actual.extraInfo).toBeTruthy;
    });
  });
});
