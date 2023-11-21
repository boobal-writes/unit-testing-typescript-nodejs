import {
  PasswordChecker,
  PasswordError,
} from "../../app/pass_checker/PasswordChecker";

describe("Password checker test suite", () => {
  let passwordChecker: PasswordChecker;
  beforeEach(() => {
    passwordChecker = new PasswordChecker();
  });
  it("should return false, when password is having less than 8 characters", () => {
    const password = "abcd";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult.valid).toBe(false);
    expect(actualResult.reasons).toContain(PasswordError.SHORT);
  });
  it("should return true, when valid password is passed", () => {
    const password = "Abcdefgh";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult.valid).toBe(true);
    expect(actualResult.reasons).toHaveLength(0);
  });
  it("should return false, when password with no upper case is passed", () => {
    const password = "abcdefgh";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult.valid).toBe(false);
    expect(actualResult.reasons).toContain(PasswordError.NO_UPPER_CASE);
  });
  it("should return false, when password with no lower case is passed", () => {
    const password = "ABCDEFGH";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult.valid).toBe(false);
    expect(actualResult.reasons).toContain(PasswordError.NO_LOWER_CASE);
  });
});
