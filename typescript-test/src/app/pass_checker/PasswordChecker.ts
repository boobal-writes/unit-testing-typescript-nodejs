export enum PasswordError {
  SHORT = "Password is shorter!",
  NO_UPPER_CASE = "Upper case letter is required!",
  NO_LOWER_CASE = "Lower case letter is required!",
  NO_NUMBER = "Atleast one number is required!",
}
export interface CheckResult {
  valid: boolean;
  reasons: PasswordError[];
}
export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordError[] = [];
    this.checkForLength(password, reasons);
    this.checkForLowerCase(password, reasons);
    this.checkForUpperCase(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const { reasons } = this.checkPassword(password);
    this.checkForNumber(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    };
  }

  private checkForNumber(password: string, reasons: PasswordError[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordError.NO_NUMBER);
    }
  }

  private checkForUpperCase(password: string, reasons: PasswordError[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordError.NO_LOWER_CASE);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordError[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordError.NO_UPPER_CASE);
    }
  }

  private checkForLength(password: string, reasons: PasswordError[]) {
    if (password.length < 8) {
      reasons.push(PasswordError.SHORT);
    }
  }
}
