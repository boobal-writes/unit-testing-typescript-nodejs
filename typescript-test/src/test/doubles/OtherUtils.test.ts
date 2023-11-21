import { StringInfo } from "../../app/Utils";
import {
  calculateComplexity,
  toUpperCaseWithCallback,
} from "../../doubles/OtherUtils";

describe("OtherUtils", () => {
  describe("calculateComplexity - stubs", () => {
    it("should calculate correct complexity", () => {
      const stringInfo: any = {
        length: 5,
        extraInfo: {
          property1: "value1",
          property2: "value2",
        },
      };

      const actualComplexity = calculateComplexity(stringInfo);

      expect(actualComplexity).toBe(10);
    });
  });

  describe("toUpperCaseWithCallback - fakes", () => {
    it("for invalid argument, it should return undefined", () => {
      const actual = toUpperCaseWithCallback("", () => {});

      expect(actual).toBeUndefined();
    });

    it("for valid argument, it should return uppercase", () => {
      const actual = toUpperCaseWithCallback("abc", () => {});

      expect(actual).toBe("ABC");
    });
  });
});
