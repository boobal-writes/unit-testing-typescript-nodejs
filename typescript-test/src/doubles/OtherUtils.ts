import { StringInfo } from "../app/Utils";

export function calculateComplexity(stringInfo: StringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}
type LoggerServiceCallback = (arg: string) => void;

export function toUpperCaseWithCallback(
  arg: string,
  callback: LoggerServiceCallback
): undefined | string {
  if (!arg) {
    callback("Invalid argument");
    return;
  }
  callback(`Function called with argument ${arg}`);
  return arg.toUpperCase();
}
