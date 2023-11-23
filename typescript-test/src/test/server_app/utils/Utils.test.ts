import { getRequestBody } from "../../../app/server_app/utils/Utils";
import { IncomingMessage } from "http";

const requestMock = {
  on: jest.fn(),
};

const someObject: any = {
  id: "",
  name: "someName",
  color: "someColor",
};

const someObjectAsString = JSON.stringify(someObject);

describe("Utils test suite", () => {
  it("should return object for valid json", async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event === "data") {
        cb(someObjectAsString);
      } else {
        cb();
      }
    });

    const actual = await getRequestBody(requestMock as any as IncomingMessage);

    expect(actual).toEqual(someObject);
  });

  it("should throw error for invalid json", async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event === "data") {
        cb("a" + someObjectAsString);
      } else {
        cb();
      }
    });

    await expect(
      getRequestBody(requestMock as any as IncomingMessage)
    ).rejects.toThrow("Unexpected token a in JSON at position 0");
  });

  it("should throw error for unexpected error", async () => {
    const someError = new Error("something went wrong");
    requestMock.on.mockImplementation((event, cb) => {
      if (event === "error") {
        cb(someError);
      }
    });
    await expect(getRequestBody(requestMock as any)).rejects.toThrow(someError);
  });
});
