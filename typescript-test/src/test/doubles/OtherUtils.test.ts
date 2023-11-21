import { StringInfo } from "../../app/Utils";
import { calculateComplexity } from "../../doubles/OtherUtils";

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
});
