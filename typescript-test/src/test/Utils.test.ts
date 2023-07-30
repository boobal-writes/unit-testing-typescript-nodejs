import { getStringInfo, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  describe("toUpperCase", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "test-data", expected: "TEST-DATA" },
      {
        input: "boobal.sachin@hotmail.com",
        expected: "BOOBAL.SACHIN@HOTMAIL.COM",
      },
    ])(
      "should return $expected, when called with $input",
      ({ input, expected }) => {
        const actual = toUpperCase(input);

        expect(actual).toBe(expected);
      }
    );
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
