import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();
jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("UserCredentialsDataAccess test suite", () => {
  let sut: UserCredentialsDataAccess;
  const someAccount: Account = {
    id: "",
    userName: "someUserName",
    password: "somePassword",
  };
  const someId = "1234";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("addUser - should call insert method with the passed account", async () => {
    insertMock.mockResolvedValue(someId);

    const actual = await sut.addUser(someAccount);

    expect(actual).toBe(someId);
    expect(insertMock).toBeCalledWith(someAccount);
  });

  it("getUserById - should call get method with the passed id", async () => {
    getByMock.mockResolvedValue(someAccount);

    const actual = await sut.getUserById(someId);

    expect(actual).toBe(someAccount);
    expect(getByMock).toBeCalledTimes(1);
    expect(getByMock).toBeCalledWith("id", someId);
  });

  it("getUserByUserName - should call get method with the passed id", async () => {
    getByMock.mockResolvedValue(someAccount);

    const actual = await sut.getUserByUserName(someAccount.userName);

    expect(actual).toBe(someAccount);
    expect(getByMock).toBeCalledTimes(1);
    expect(getByMock).toBeCalledWith("userName", someAccount.userName);
  });
});
