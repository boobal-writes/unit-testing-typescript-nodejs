import { DataBase } from "../../app/server_app/data/DataBase";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { RequestTestWrapper } from "./test_utils/RequestTestWrapper";
import { ResponseTestWrapper } from "./test_utils/ResponseTestWrapper";

jest.mock("../../app/server_app/data/DataBase");

const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();

const fakeServer = {
  listen: () => {},
  close: () => {},
};

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestWrapper, responseWrapper);
    return fakeServer;
  },
}));

describe("RegisterRequests test suite", () => {
  afterEach(() => {
    requestWrapper.clearFields();
    responseWrapper.clearFields();
    jest.clearAllMocks();
  });

  it("should register new user", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.url = "localhost:8080/register";
    requestWrapper.body = {
      userName: "someUserName",
      password: "somePassword",
    };

    jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseWrapper.body).toEqual(
      expect.objectContaining({
        userId: expect.any(String),
      })
    );
  });

  it("should reject invalid register request", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.url = "localhost:8080/register";
    requestWrapper.body = {};

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseWrapper.body).toBe("userName and password required");
  });

  it("should do nothing for not supported methods", async () => {
    requestWrapper.method = HTTP_METHODS.PUT;
    requestWrapper.url = "localhost:8080/register";
    requestWrapper.body = {};

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBeUndefined();
  });
});
