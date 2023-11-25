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
    sut.stopServer;
  });

  const someUser = {
    userName: "someUserName",
    password: "somePassword",
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
});
