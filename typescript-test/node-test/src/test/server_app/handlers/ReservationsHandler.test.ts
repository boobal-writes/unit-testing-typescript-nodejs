import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../../app/server_app/model/ServerModel";

const getRequestBodyMock = jest.fn();
jest.mock("../../../app/server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe("ReservationsHandler test suite", () => {
  const requestMock = {
    method: undefined,
    headers: {
      authorization: undefined,
    },
  };

  const responseMock = {
    statusCode: 0,
    write: jest.fn(),
    writeHead: jest.fn(),
  };

  const authorizerMock = {
    isOperationAuthorized: jest.fn(),
    validateToken: jest.fn(),
  };

  const reservationDataAccessMock = {
    createReservation: jest.fn(),
  };

  let sut: ReservationsHandler;

  const someReservation: Reservation = {
    id: "",
    room: "someRoom",
    user: "someUser",
    startDate: "23/11/2023",
    endDate: "25/11/2023",
  };

  const someReservationId = "Res1234";

  beforeEach(() => {
    sut = new ReservationsHandler(
      requestMock as any as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer,
      reservationDataAccessMock as any as ReservationsDataAccess
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create reservation from the post request", async () => {
    requestMock.headers.authorization = "Token123";
    requestMock.method = HTTP_METHODS.POST;
    authorizerMock.validateToken.mockReturnValue(true);
    getRequestBodyMock.mockResolvedValueOnce(someReservation);

    reservationDataAccessMock.createReservation.mockResolvedValueOnce(
      someReservationId
    );

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.write).toBeCalledWith(
      JSON.stringify({ reservationId: someReservationId })
    );
  });
});
