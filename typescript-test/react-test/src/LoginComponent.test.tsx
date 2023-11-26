import { render, screen } from "@testing-library/react";
import LoginComponent from "./LoginComponent";

describe("LoginComponent test suite", () => {
  const loginServiceMock = {
    login: jest.fn(),
  };
  const setTokenMock = jest.fn();
  it("should render login components", () => {
    render(
      <LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />
    );

    const mainDiv = screen.getByRole("main");
    expect(mainDiv).toBeInTheDocument();
  });
});
