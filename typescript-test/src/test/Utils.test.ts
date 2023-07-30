import { getStringInfo, toUppercase } from "../app/Utils";

describe("Utils test suite", () => {
  it("should return uppercase of string when valid string is passed", () => {
    const expected = "ABC";

    const actual = toUppercase("abc");

    expect(actual).toBe(expected);
  });

  it("should return string info when valid string is passed", () => {
    const actual = getStringInfo("Test");

    expect(actual.upperCase).toBe("TEST");

    expect(actual.lowerCase).toBe("test");

    expect(actual.length).toBe(4);

    expect(actual.characters).toEqual(["T", "e", "s", "t"]);
    expect(actual.characters).toHaveLength(4);
    expect(actual.characters).toContain("T");
    expect(actual.characters).toEqual(
      expect.arrayContaining(["e", "s", "t", "T"])
    );

    expect(actual.extraInfo).toEqual({});
    expect(actual.extraInfo).not.toBe(undefined);
    expect(actual.extraInfo).not.toBeUndefined();
    expect(actual.extraInfo).toBeDefined();
    expect(actual.extraInfo).toBeTruthy;
  });
});
