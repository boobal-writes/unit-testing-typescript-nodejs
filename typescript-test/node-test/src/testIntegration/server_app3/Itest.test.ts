import * as IdGenerator from "../../app/server_app/data/IdGenerator";
import { Reservation } from "../../app/server_app/model/ReservationModel";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { makeAwesomeRequest } from "./utils/http-client";

describe("Server app integration tests", () => {
  let sut: Server;
  beforeAll(() => {
    sut = new Server();
    sut.startServer();
  });

  afterAll(() => {
    sut.stopServer();
  });

  const someUser = {
    userName: "someUserName",
    password: "somePassword",
  };

  const someReservation: Reservation = {
    id: "",
    room: "someRoom",
    user: "someUserName",
    startDate: "2023-11-24",
    endDate: "2023-11-25",
  };

  it("should register new user with fetch library", async () => {
    const result = await fetch("http://localhost:8080/register", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
  });

  it("should register new user with makeAwesomeRequest", async () => {
    const result = await makeAwesomeRequest(
      {
        host: "localhost",
        port: "8080",
        method: HTTP_METHODS.POST,
        path: "/register",
      },
      someUser
    );

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });
  let token: string;
  it("should login a registered user", async () => {
    const result = await fetch("http://localhost:8080/login", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token;
  });
  let createdReservationId: string;
  it("should create a reservation", async () => {
    const result = await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      headers: {
        authorization: token,
      },
      body: JSON.stringify(someReservation),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.reservationId).toBeDefined();
    createdReservationId = resultBody.reservationId;
  });

  it("should get a reservation", async () => {
    const expectedReservation = structuredClone(someReservation);
    expectedReservation.id = createdReservationId;

    const result = await fetch(
      `http://localhost:8080/reservation/${createdReservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(expectedReservation);
  });

  it("snapshot test", async () => {
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce("12345");
    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      headers: {
        authorization: token,
      },
      body: JSON.stringify(someReservation),
    });

    const result = await fetch(`http://localhost:8080/reservation/12345`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });
    const requestBody = await result.json();
    expect(requestBody).toMatchSnapshot();
  });
});
