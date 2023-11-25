import { Reservation } from "../app/server_app/model/ReservationModel";

expect.extend({
  toBeValidReservation: (reservation: Reservation) => {
    const validId = reservation.id.length > 5;
    const validUser = reservation.user.length > 5;
    return {
      pass: validId && validUser,
      message: () => "Expects valid reservation ID and user",
    };
  },
  toHaveUser: (reservation: Reservation, user: string) => {
    return {
      pass: reservation.user === user,
      message: () =>
        `Expected reservation to have ${reservation.user}, actual ${user}`,
    };
  },
});

interface CustomMatchers<R> {
  toBeValidReservation(): R;
  toHaveUser(user: string): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

describe("custom matchers", () => {
  it("custom matcher toBeValidReservation should work", () => {
    const someReservation: Reservation = {
      id: "123456",
      user: "someUserName",
      room: "someRoom",
      startDate: "2023-11-24",
      endDate: "2023-11-25",
    };
    expect(someReservation).toBeValidReservation();
    expect(someReservation).toHaveUser("someUserNam");
  });
});
