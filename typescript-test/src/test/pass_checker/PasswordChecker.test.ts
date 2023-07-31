import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe("Password checker test suite", () => {
  let passwordChecker: PasswordChecker;
  beforeEach(() => {
    passwordChecker = new PasswordChecker();
  });
  it("should return false, when password is having less than 8 characters", () => {
    const password = "abcd";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult).toBe(false);
  });
  it("should return true, when valid password is passed", () => {
    const password = "Abcdefgh";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult).toBe(true);
  });
  it("should return false, when password with no upper case is passed", () => {
    const password = "abcdefgh";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult).toBe(false);
  });
  it("should return false, when password with no lower case is passed", () => {
    const password = "ABCDEFGH";

    const actualResult = passwordChecker.checkPassword(password);

    expect(actualResult).toBe(false);
  });
});
