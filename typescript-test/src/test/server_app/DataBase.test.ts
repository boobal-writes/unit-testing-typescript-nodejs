import { DataBase } from "../../app/server_app/data/DataBase";
import * as IdGenerator from "../../app/server_app/data/IdGenerator";

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suite", () => {
  const fakeId = "1234";
  const someObject1: SomeTypeWithId = {
    id: "",
    name: "someName",
    color: "blue",
  };
  const someObject2: SomeTypeWithId = {
    id: "",
    name: "someOtherName",
    color: "blue",
  };

  let sut: DataBase<SomeTypeWithId>;

  beforeEach(() => {
    sut = new DataBase<SomeTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should insert an item", async () => {
    const actual = await sut.insert(someObject1);

    expect(actual).toBe(fakeId);
  });

  it("should get an item by property", async () => {
    const id = await sut.insert(someObject1);

    const actual = await sut.getBy("id", fakeId);

    expect(actual).toBe(someObject1);
  });

  it("should find all items by property", async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);
    const expected = [someObject1, someObject2];

    const actual = await sut.findAllBy("color", "blue");

    expect(actual).toEqual(expected);
  });

  it("should update an item", async () => {
    const id = await sut.insert(someObject1);

    await sut.update(id, "color", "black");

    const updatedObject = await sut.getBy("id", id);
    expect(updatedObject.color).toBe("black");
  });

  it("should delete an item", async () => {
    const id = await sut.insert(someObject1);

    await sut.delete(id);

    const actual = await sut.getBy("id", id);
    expect(actual).toBeUndefined();
  });

  it("should get all items", async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);
    const expected = [someObject1, someObject2];

    const actual = await sut.getAllElements();

    expect(actual).toEqual(expected);
  });
});
