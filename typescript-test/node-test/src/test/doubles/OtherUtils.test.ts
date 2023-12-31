import { StringInfo } from "../../app/Utils";
import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCallback,
} from "../../app/doubles/OtherUtils";

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

  describe("toUpperCaseWithCallback - custom made mocks", () => {
    let callbackArguments = [];
    let timesCalled = 0;

    function customMockCallbackFunction(arg: string) {
      callbackArguments.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      callbackArguments = [];
      timesCalled = 0;
    });

    it("for invalid argument, it should return undefined", () => {
      const actual = toUpperCaseWithCallback("", customMockCallbackFunction);

      expect(actual).toBeUndefined();
      expect(callbackArguments).toContain("Invalid argument");
      expect(timesCalled).toBe(1);
    });

    it("for valid argument, it should return uppercase", () => {
      const actual = toUpperCaseWithCallback("abc", customMockCallbackFunction);

      expect(actual).toBe("ABC");
      expect(callbackArguments).toContain("Function called with argument abc");
      expect(timesCalled).toBe(1);
    });
  });

  describe("toUpperCaseWithCallback - jest mocks", () => {
    const jestMockFunction = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("for invalid argument, it should return undefined", () => {
      const actual = toUpperCaseWithCallback("", jestMockFunction);

      expect(actual).toBeUndefined();
      expect(jestMockFunction).toBeCalledWith("Invalid argument");
      expect(jestMockFunction).toBeCalledTimes(1);
    });

    it("for valid argument, it should return uppercase", () => {
      const actual = toUpperCaseWithCallback("abc", jestMockFunction);

      expect(actual).toBe("ABC");
      expect(jestMockFunction).toBeCalledWith(
        "Function called with argument abc"
      );
      expect(jestMockFunction).toBeCalledTimes(1);
    });
  });

  describe("OtherStringUtils - spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    it("spy on toUpperCase", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");

      sut.toUpperCase("abc");

      expect(toUpperCaseSpy).toBeCalledWith("abc");
    });

    it("spy on console log", () => {
      const consoleLogSpy = jest.spyOn(console, "log");

      sut.logString("abc");

      expect(consoleLogSpy).toBeCalledWith("abc");
    });

    it("spy and replace a method implementation", () => {
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("calling mock implementation");
      });

      sut.doWork();
    });
  });
});
