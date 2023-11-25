import { generateRandomId } from "../../../app/server_app/data/IdGenerator";

describe("IdGenerator test suite", () => {
  it("should return random id", () => {
    const actual = generateRandomId();

    expect(actual.length).toBe(20);
  });
});
