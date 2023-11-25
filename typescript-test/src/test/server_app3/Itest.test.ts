import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";

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

  it("should register new user", async () => {
    const result = await fetch("http://localhost:8080/register", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
  });
});
