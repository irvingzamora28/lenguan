import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./../../../components/Pages/AuthPage/LoginPage";
import { LoginService } from "./../../../services/LoginService";
import { loginSuccess, loginRequest, loginFailure, loginGuest } from "./../../../redux/authSlice";
import { describe, it, beforeEach, vi } from "vitest";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("LoginPage", () => {
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks();

         // Mock LoginService.login
         LoginService.login = vi.fn().mockResolvedValue({
            data: {
                token: "mockAccessToken",
                user: { id: 123, name: "John Doe", email: "test@example.com" },
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
		expect(getByText("Sign in")).toBeInTheDocument();
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
		const submitButton = getByText("Sign in");

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
					user: { id: 123, name: "John Doe", email: "test@example.com" },
				})
			);
		});
	});

    it("should set guest to true when 'Continue as Guest' button is clicked", async () => {
        const mockDispatch = vi.spyOn(store, "dispatch");

		const { getByLabelText, getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</Provider>
		);
        fireEvent.click(getByText('Continue as Guest'));
        await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(loginGuest());
            const newState = store.getState();
	        expect(newState.auth.isGuest).toBe(true);
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
        const submitButton = getByText("Sign in");

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
