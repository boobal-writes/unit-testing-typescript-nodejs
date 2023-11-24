import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const isValidTokenMock = jest.fn();
jest.mock("../../../app/server_app/data/SessionTokenDataAccess", () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        isValidToken: isValidTokenMock,
      };
    }),
  };
});

const addUserMock = jest.fn();
jest.mock("../../../app/server_app/data/UserCredentialsDataAccess", () => {
  return {
    UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
      return {
        addUser: addUserMock,
      };
    }),
  };
});

describe("Authorizer test suite", () => {
  const someTokenId = "Token123";
  const someUserId = "User123";
  const someAccount: Account = {
    id: "",
    userName: "someUserName",
    password: "somePassword",
  };

  let sut: Authorizer;

  beforeEach(() => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toBeCalledTimes(1);
    expect(UserCredentialsDataAccess).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return token validation response", async () => {
    isValidTokenMock.mockResolvedValueOnce(true);

    const result = await sut.validateToken(someTokenId);

    expect(result).toBe(true);
    expect(isValidTokenMock).toBeCalledWith(someTokenId);
    expect(isValidTokenMock).toBeCalledTimes(1);
  });

  it("should return userId for newly registered user", async () => {
    addUserMock.mockResolvedValueOnce(someUserId);

    const result = await sut.registerUser(
      someAccount.userName,
      someAccount.password
    );

    expect(result).toBe(someUserId);
    expect(addUserMock).toBeCalledWith(someAccount);
    expect(addUserMock).toBeCalledTimes(1);
  });
});
