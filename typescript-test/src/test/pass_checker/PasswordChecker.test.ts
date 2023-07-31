import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe("Password checker test suite", () => {
  let passwordChecker: PasswordChecker;
  beforeEach(() => {
    passwordChecker = new PasswordChecker();
  });
  it("should do nothing for the moment", () => {
    passwordChecker.checkPassword();
  });
});
