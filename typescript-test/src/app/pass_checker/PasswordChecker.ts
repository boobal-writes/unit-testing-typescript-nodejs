export enum PasswordError {
  SHORT = "Password is shorter!",
  NO_UPPER_CASE = "Upper case letter is required!",
  NO_LOWER_CASE = "Lower case letter is required!",
}
export interface CheckResult {
  valid: boolean;
  reasons: PasswordError[];
}
export class PasswordChecker {
  public checkPassword(password: string): boolean {
    if (password.length < 8) return false;
    if (password == password.toLowerCase()) return false;
    if (password == password.toUpperCase()) return false;
    return true;
  }
}
