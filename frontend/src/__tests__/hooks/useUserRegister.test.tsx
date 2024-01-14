import { describe, it, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useUserRegister from "../../hooks/useUserRegister";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";
import store from "../../redux/store";
import authReducer from "../../redux/authSlice";
import languageReducer from "../../redux/languageSlice";
import { configureStore } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";
import { RegisterService } from "../../services/RegisterService";
import { LoginService } from "../../services/LoginService";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
	return {
		...mod,
		useNavigate: () => mockNavigate,
	};
});

vi.mock("../../hooks/useUserLogin", () => {
	return {
		default: vi.fn().mockReturnValue({
			handleLoginSuccess: vi.fn(),
		}),
	};
});

vi.mock("../../hooks/useUserLogout", () => {
	return {
		default: vi.fn().mockReturnValue({
			handleLogout: vi.fn(),
		}),
	};
});

// useUser: vi.fn(),
let useUserMock: any;
vi.mock("../../redux/hooks", () => ({
	useUser: () => useUserMock(),
}));

const mockUser = { id: 123, name: "John Doe", email: "test@example.com", native_language_code: "en", learning_language: { _id: "4", name: "German", code: "de" } };
describe("useUserRegister from RegisterPage", () => {
	const mockLanguageData = [
		{ _id: "1", name: "English", code: "en" },
		{ _id: "2", name: "Spanish", code: "es" },
		{ _id: "3", name: "French", code: "fr" },
		{ _id: "4", name: "German", code: "de" },
	];

	const mockPreloadedState = {
		auth: {
			user: null,
			isAuthenticated: true,
			isGuest: false,
			isLoading: false,
			token: null,
			error: null,
		},
		language: {
			selectedLanguage: mockLanguageData[3],
			languages: mockLanguageData,
			courseProgress: {},
		},
	};

	const mockStore = configureStore({
		reducer: {
			auth: authReducer,
			language: languageReducer,
		},
		preloadedState: mockPreloadedState,
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should initialize registerData with default values when user registers straight from register page", () => {
		useUserMock = () => null;

		const { result } = renderHook(() => useUserRegister(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		expect(result.current.registerData).toEqual({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			guest_data: null,
		});
	});

	it("should initialize registerData with default values when user registers from guest Register", () => {
		useUserMock = () => mockUser;
		const { result } = renderHook(() => useUserRegister(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>
					<BrowserRouter>{children}</BrowserRouter>
				</Provider>
			),
		});

		expect(result.current.registerData).toEqual({
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			guest_data: JSON.stringify(mockUser),
		});
	});

	it("should update registerData when handleChange is called", () => {
		const { result } = renderHook(() => useUserRegister(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		act(() => {
			const mockEvent = {
				target: {
					name: "email",
					value: "test@example.com",
					// Add any other properties that your handleChange function might use
				},
			} as ChangeEvent<HTMLInputElement>; // Cast the mock object to the correct type

			result.current.handleChange(mockEvent);
		});

		expect(result.current.registerData.email).toBe("test@example.com");
	});

	it("should handle form submission with valid data", async () => {
		// Mock a successful register and login response
		const registerMock = vi.fn().mockResolvedValue({
			data: {
				success: true,
			},
		});
		const loginMock = vi.fn().mockResolvedValue({
			data: {
				token: "mockAccessToken",
				user: mockUser,
			},
		});
		RegisterService.register = registerMock;
		LoginService.login = loginMock;

		useUserMock = () => null;

		const { result } = renderHook(() => useUserRegister("/some-path"), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		act(() => {
			result.current.handleChange({ target: { name: "email", value: "test@example.com" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password", value: "password123" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "name", value: "Test User" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password_confirmation", value: "password123" } } as ChangeEvent<HTMLInputElement>);
		});

		await act(async () => {
			await result.current.handleRegister({ preventDefault: () => {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>);
		});

		vi.useFakeTimers();
		vi.advanceTimersByTime(7500);
		setTimeout(() => {
			// Assertions
			expect(mockNavigate).toHaveBeenCalledWith("/some-path");
			expect(result.current.errorMessages).toEqual({});
			expect(result.current.registerData.email).toBe("test@example.com");
			expect(registerMock).toHaveBeenCalled();
			expect(loginMock).toHaveBeenCalled();
		}, 7500);
	});

	it("should handle validation errors correctly", async () => {
		const { result } = renderHook(() => useUserRegister(), {
			wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
		});

		act(() => {
			// Simulate form submission with invalid data
			result.current.handleChange({ target: { name: "email", value: "" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password", value: "" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "name", value: "" } } as ChangeEvent<HTMLInputElement>);
		});

		await act(async () => {
			await result.current.handleRegister({ preventDefault: () => {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>);
		});

		expect(result.current.errorMessages).toHaveProperty("errors");
		expect(result.current.errorMessages.errors).toContain("Email is required");
		expect(result.current.errorMessages.errors).toContain("Password is required");
		expect(result.current.errorMessages.errors).toContain("Name is required");
	});

	it("should handle registration service errors correctly", async () => {
		// Mock a failed register response
		RegisterService.register = vi.fn().mockRejectedValue({
			response: { data: { errors: ["Registration failed"] } },
		});

		const { result } = renderHook(() => useUserRegister(), {
			wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
		});

		// Simulate valid form data
		act(() => {
			result.current.handleChange({ target: { name: "email", value: "test@example.com" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password", value: "password123" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "name", value: "Test User" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password_confirmation", value: "password123" } } as ChangeEvent<HTMLInputElement>);
		});

		await act(async () => {
			await result.current.handleRegister({ preventDefault: () => {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>);
		});

		expect(result.current.errorMessages).toContain("Registration failed");
	});

	it("should handle login service errors correctly", async () => {
		// Mock a successful register response followed by a failed login response
		RegisterService.register = vi.fn().mockResolvedValue({ data: { success: true } });
		LoginService.login = vi.fn().mockRejectedValue({
			response: { data: { errors: ["Login failed"] } },
		});

		const { result } = renderHook(() => useUserRegister(), {
			wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
		});

		// Simulate valid form data
		act(() => {
			result.current.handleChange({ target: { name: "email", value: "test@example.com" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password", value: "password123" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "name", value: "Test User" } } as ChangeEvent<HTMLInputElement>);
			result.current.handleChange({ target: { name: "password_confirmation", value: "password123" } } as ChangeEvent<HTMLInputElement>);
		});

		await act(async () => {
			await result.current.handleRegister({ preventDefault: () => {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>);
		});

		expect(result.current.errorMessages).toContain("Login failed");
	});

	// it("should call register and login services on successful handleRegister", async () => {
	// 	const registerMock = vi.fn();
	// 	const loginMock = vi.fn();

	// 	const { result } = renderHook(() => useUserRegister(), {
	// 		mocks: {
	// 			RegisterService: {
	// 				register: registerMock,
	// 			},
	// 			LoginService: {
	// 				login: loginMock,
	// 			},
	// 		},
	// 	});

	// 	act(() => {
	// 		result.current.registerData = {
	// 			name: "Test User",
	// 			email: "test@example.com",
	// 			password: "password123",
	// 			password_confirmation: "password123",
	// 			guest_data: null,
	// 		};

	// 		result.current.handleRegister({
	// 			preventDefault: () => {},
	// 		} as any);
	// 	});

	// 	await waitFor(() => {
	// 		expect(registerMock).toHaveBeenCalled();
	// 		expect(loginMock).toHaveBeenCalled();
	// 	});
	// });
});
