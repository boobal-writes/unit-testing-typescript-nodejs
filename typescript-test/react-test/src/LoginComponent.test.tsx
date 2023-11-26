import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginComponent from "./LoginComponent";
import { act } from "react-dom/test-utils";

describe("LoginComponent test suite", () => {
  const loginServiceMock = {
    login: jest.fn(),
  };

  function setUp() {
    render(
      <LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />
    );
  }

  function clickElement(element: HTMLElement) {
    user.click(element);
  }

  beforeEach(() => {
    setUp();
  });

  const setTokenMock = jest.fn();
  it("should render login component", () => {
    const mainDiv = screen.getByRole("main");
    expect(mainDiv).toBeInTheDocument();
    const userNameInput = screen.getByTestId("login-username");
    expect(userNameInput).toBeInTheDocument();
    expect(userNameInput.getAttribute("value")).toBe("");
    const passwordInput = screen.getByTestId("login-password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.getAttribute("value")).toBe("");
    const submitButton = screen.getByTestId("login-submit");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.getAttribute("value")).toBe("Login");
    expect(screen.queryByTestId("resultLabel")).not.toBeInTheDocument();
  });

  it("when click login button with incomplete credentials, should show required message - fireEvent", () => {
    const submitButton = screen.getByTestId("login-submit");

    fireEvent.click(submitButton);

    const resultLabel = screen.getByTestId("resultLabel");
    expect(resultLabel).toBeInTheDocument();
    expect(resultLabel.textContent).toBe("UserName and password required!");
  });

  it("when click login button with incomplete credentials, should show required message - user click", () => {
    const submitButton = screen.getByTestId("login-submit");

    act(() => {
      clickElement(submitButton);
    });

    const resultLabel = screen.getByTestId("resultLabel");
    expect(resultLabel).toBeInTheDocument();
    expect(resultLabel.textContent).toBe("UserName and password required!");
  });
});
