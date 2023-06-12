import authReducer, { loginSuccess, loginFailure, logout, loginGuest } from "./../../redux/authSlice";
import { User } from "./../../types";
import { generateGuestUser } from "./../../utils/userUtils";

describe("auth reducer", () => {
	const initialState = {
		user: null,
		token: null,
		isAuthenticated: false,
		isGuest: false,
		isLoading: false,
		error: null,
	};

	it("should handle initial state", () => {
		expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle loginSuccess", () => {
		const dummyUser: User = { id: 123, name: "John Doe", email: "test@example.com" };
		const dummyToken = "dummyToken";
		const actual = authReducer(initialState, loginSuccess({ user: dummyUser, token: dummyToken }));
		expect(actual.isAuthenticated).toEqual(true);
		expect(actual.token).toEqual(dummyToken);
		expect(actual.user).toEqual(dummyUser);
	});

	it("should handle loginFailure", () => {
		const dummyError = "Login failed";
		const actual = authReducer(initialState, loginFailure(dummyError));
		expect(actual.isLoading).toEqual(false);
		expect(actual.error).toEqual(dummyError);
	});

	it("should handle loginGuest", () => {
		const mockGuestUser = generateGuestUser();
		const actual = authReducer(initialState, loginGuest({ user: mockGuestUser }));
		expect(actual.isGuest).toEqual(true);
	});

	it("should handle logout", () => {
		const actual = authReducer(initialState, logout());
		expect(actual.isAuthenticated).toEqual(false);
		expect(actual.token).toEqual(null);
		expect(actual.user).toEqual(null);
		expect(actual.isGuest).toEqual(false);
	});
});
