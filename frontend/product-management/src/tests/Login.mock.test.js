import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Login from "../components/Login";
import * as authService from "../services/authService";

jest.mock("../services/authService");

describe("Login Component Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("TC1: Hien thi loi khi submit form rong", async () => {
    render(<Login />);

    const submitBtn = screen.getByTestId("login-button");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId("username-error")).toBeInTheDocument();
      expect(screen.getByTestId("password-error")).toBeInTheDocument();
    });
  });

  test("TC2: Goi API khi submit form hop le", async () => {
    authService.loginUser.mockResolvedValue({
      success: true,
      token: "mock-token",
    });

    render(<Login />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Test123" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith("testuser", "Test123");
      expect(screen.getByTestId("login-message")).toHaveTextContent(
        "Login successful"
      );
    });
  });

  test("TC3: Hien thi loi khi dang nhap that bai ", async () => {
    authService.loginUser.mockRejectedValue(new Error("Login failed"));  

    render(<Login />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "wrong" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "T123456" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(screen.getByTestId("login-message")).toHaveTextContent("Login failed");
    });
  });
});
