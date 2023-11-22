jest.mock("../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => -1,
}));

jest.mock("uuid", () => ({
  v4: () => "123",
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("doubles - mock modules", () => {
  it("calculateComplexity - return from mocked implementation", () => {
    const result = OtherUtils.calculateComplexity({} as any);

    expect(result).toBe(-1);
  });

  it("toUpperCase - return from actual implementation", () => {
    const result = OtherUtils.toUpperCase("abc");

    expect(result).toBe("ABC");
  });

  it("toLowerCaseWithId - mock dependency module implementation", () => {
    const result = OtherUtils.toLowerCaseWithId("ABC");

    expect(result).toBe("abc123");
  });
});
