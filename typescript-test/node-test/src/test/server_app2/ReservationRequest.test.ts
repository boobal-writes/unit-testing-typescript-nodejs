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
const jsonHeader = { "Content-Type": "application/json" };

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
const getBySpy = jest.spyOn(DataBase.prototype, "getBy");
const insertSpy = jest.spyOn(DataBase.prototype, "insert");
describe("Reservation Request test suite", () => {
  const someTokenId = "Token123";
  const someReservationId = "Reservation123";

  const someSessionToken = {
    id: "string",
    userName: "someUserName",
    valid: "true",
    expirationDate: "2023-11-24",
  };
  beforeEach(() => {
    requestWrapper.headers = {
      authorization: "someTokenId",
      "user-agent": "jest tests",
    };
    getBySpy.mockResolvedValueOnce(someSessionToken);
  });

  afterEach(() => {
    requestWrapper.clearFields();
    responseWrapper.clearFields();
    jest.clearAllMocks();
  });

  it("should should create a reservation", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.url = "localhost:8080/reservation";
    requestWrapper.body = {
      room: "someRoom",
      user: "someUser",
      startDate: "2023-11-24",
      endDate: "2023-11-25",
    };

    insertSpy.mockResolvedValueOnce(someReservationId);

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseWrapper.body).toEqual(
      expect.objectContaining({
        reservationId: someReservationId,
      })
    );
    expect(responseWrapper.headers).toContainEqual(jsonHeader);
  });
});
