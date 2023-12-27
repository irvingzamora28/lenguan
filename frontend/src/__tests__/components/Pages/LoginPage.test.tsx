import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./../../../components/Pages/AuthPage/LoginPage";
import { LoginService } from "./../../../services/LoginService";
import { loginSuccess, loginRequest, loginFailure, loginGuest } from "./../../../redux/authSlice";
import { describe, it, beforeEach, vi, Mock } from "vitest";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { generateGuestUser } from "../../../utils/userUtils";

vi.mock("../../../utils/userUtils", () => ({
	generateGuestUser: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
	return {
		...mod,
		useNavigate: () => mockNavigate,
	};
});

describe("LoginPage", () => {
	const mockUser = createMockUser();
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks();

		// Mock LoginService.login
		LoginService.login = vi.fn().mockResolvedValue({
			data: {
				token: "mockAccessToken",
				user: mockUser,
			},
		});
	});

	it("should render the login form", () => {
		const { getByLabelText, getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</Provider>
		);
		expect(getByLabelText("Email address")).toBeInTheDocument();
		expect(getByLabelText("Password")).toBeInTheDocument();
		expect(getByText("Log in")).toBeInTheDocument();
	});

	it("should submit the login form with valid data", async () => {
		const mockDispatch = vi.spyOn(store, "dispatch");

		const { getByLabelText, getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</Provider>
		);
		const emailInput = getByLabelText("Email address");
		const passwordInput = getByLabelText("Password");
		const submitButton = getByText("Log in");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.click(submitButton);

		expect(LoginService.login).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "password",
		});

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(loginRequest());
			expect(mockDispatch).toHaveBeenCalledWith(
				loginSuccess({
					token: "mockAccessToken",
					user: mockUser,
				})
			);
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});

	it("should handle guest login when 'Continue as Guest' is clicked", async () => {
		const mockDispatch = vi.spyOn(store, "dispatch");

		const { getByLabelText, getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</Provider>
		);
		const submitButton = getByText("Continue as Guest");
		(generateGuestUser as Mock).mockReturnValue(mockUser);

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(loginRequest());
			expect(mockDispatch).toHaveBeenCalledWith(loginGuest({ user: mockUser }));
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});

	it("should display an error message for invalid login", async () => {
		const mockDispatch = vi.spyOn(store, "dispatch");

		// Modify the mock for this test to simulate a failed login
		LoginService.login = vi.fn().mockRejectedValue({
			response: {
				data: {
					message: "Invalid credentials",
				},
			},
		});

		const { getByLabelText, getByText, queryByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</Provider>
		);
		const emailInput = getByLabelText("Email address");
		const passwordInput = getByLabelText("Password");
		const submitButton = getByText("Log in");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
		fireEvent.click(submitButton);

		expect(LoginService.login).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "wrongpassword",
		});

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(loginFailure("Invalid credentials"));
			expect(queryByText("Invalid credentials")).toBeInTheDocument();
		});
	});
});

function createMockUser() {
	return {
		id: 123,
		name: "John Doe",
		email: "test@example.com",
		native_language_code: "en",
		image: "test.jpg",
		profile_image_path: "test/path",
	};
}
