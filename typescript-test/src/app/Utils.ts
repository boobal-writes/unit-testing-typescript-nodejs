export class StringUtils {
  toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    return arg.toUpperCase();
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: object | undefined;
};

export function getStringInfo(arg: string): StringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
