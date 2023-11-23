import { Server } from "../../../app/server_app/server/Server";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";

jest.mock("../../../app/server_app/auth/Authorizer");
jest.mock("../../../app/server_app/data/ReservationsDataAccess");
jest.mock("../../../app/server_app/handlers/LoginHandler");
jest.mock("../../../app/server_app/handlers/RegisterHandler");
jest.mock("../../../app/server_app/handlers/ReservationsHandler");

const requestMock = {
  headers: {
    "user-agent": "jest-test",
  },
  url: undefined,
};

const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
};

const serverMock = {
  listen: jest.fn(),
  close: jest.fn(),
};

jest.mock("http", () => ({
  createServer: (cb): Server => {
    cb(
      requestMock as any as IncomingMessage,
      responseMock as any as ServerResponse
    );
    return serverMock as any as Server;
  },
}));

describe("Server", () => {
  let server: Server;

  beforeEach(() => {
    server = new Server();
    expect(Authorizer).toBeCalledTimes(1);
    expect(ReservationsDataAccess).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should listend on port 8080 and end the response", async () => {
    await server.startServer();

    expect(serverMock.listen).toBeCalledWith(8080);
    expect(responseMock.end).toBeCalledTimes(1);
  });

  it("should handle register request", async () => {
    requestMock.url = "localhost:8080/register";
    const handleRegisterRequestSpy = jest.spyOn(
      RegisterHandler.prototype,
      "handleRequest"
    );

    await server.startServer();

    expect(handleRegisterRequestSpy).toBeCalledTimes(1);
    expect(RegisterHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it("should handle login request", async () => {
    requestMock.url = "localhost:8080/login";
    const handleLoginRequestSpy = jest.spyOn(
      LoginHandler.prototype,
      "handleRequest"
    );

    await server.startServer();

    expect(handleLoginRequestSpy).toBeCalledTimes(1);
    expect(LoginHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it("should handle reservation request", async () => {
    requestMock.url = "localhost:8080/reservation";
    const handleReservationRequestSpy = jest.spyOn(
      ReservationsHandler.prototype,
      "handleRequest"
    );

    await server.startServer();

    expect(handleReservationRequestSpy).toBeCalledTimes(1);
    expect(ReservationsHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
  });

  it("should do nothing for not supported routes", async () => {
    requestMock.url = "localhost:8080/someRandomRoutes";
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, "validateToken");

    await server.startServer();

    expect(validateTokenSpy).not.toBeCalled();
  });

  it("should handle errors in serving requests", async () => {
    requestMock.url = "localhost:8080/reservation";
    const handleReservationRequestSpy = jest.spyOn(
      ReservationsHandler.prototype,
      "handleRequest"
    );
    const expectedError = new Error("something went wrong");
    handleReservationRequestSpy.mockRejectedValueOnce(expectedError);

    await server.startServer();

    expect(handleReservationRequestSpy).toBeCalledTimes(1);
    expect(ReservationsHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
    expect(responseMock.writeHead).toBeCalledWith(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      JSON.stringify(`Internal server error: ${expectedError.message}`)
    );
  });

  it("should stop the server if started", async () => {
    await server.startServer();

    await server.stopServer();

    expect(serverMock.close).toBeCalled();
  });

  it("should not stop the server if not started", async () => {
    await server.stopServer();

    expect(serverMock.close).not.toBeCalled();
  });
});
