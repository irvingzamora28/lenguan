import React, { PropsWithChildren } from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../../redux/authSlice";
import languageReducer from "../../../../redux/languageSlice";
import Navbar from "../../../../components/Items/Navbar/Navbar";
import { vi } from "vitest";
import { languages } from "../../../../shared/languages";

describe("Navbar", () => {
	const mockProps = {
		asideOpen: false,
		setAsideOpen: vi.fn(),
		profileOpen: false,
		setProfileOpen: vi.fn(),
	};

	const mockUser = { id: 123, name: "John Doe", email: "test@example.com" };

	const mockPreloadedState = {
		auth: {
			user: mockUser,
			isAuthenticated: true,
			isGuest: false,
			isLoading: false,
			token: null,
			error: null,
		},
		language: {
			selectedLanguage: "EN",
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

	it("should render the Navbar", () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<Navbar {...mockProps} />
			</Provider>
		);

		expect(getByText(/EN/i)).toBeInTheDocument();
	});

	it("should toggle language menu", () => {
		const { getByText, queryByText } = render(
			<Provider store={mockStore}>
				<Navbar {...mockProps} />
			</Provider>
		);

		const languageButton = getByText(/EN/i);

		languages.forEach(({ title }) => {
			expect(queryByText(new RegExp(title, "i"))).not.toBeInTheDocument();
		});

		fireEvent.click(languageButton);

		// All languages should now be visible
		languages.forEach(({ title }) => {
			expect(getByText(new RegExp(title, "i"))).toBeInTheDocument();
		});

		// Simulate another click on the language button
		fireEvent.click(languageButton);

		// No language should be visible again
		languages.forEach(({ title }) => {
			expect(queryByText(new RegExp(title, "i"))).not.toBeInTheDocument();
		});
	});

	it("should toggle aside menu", () => {
		const { getByRole } = render(
			<Provider store={mockStore}>
				<Navbar {...mockProps} />
			</Provider>
		);

		const menuButton = getByRole("button", { name: /menu/i });

		fireEvent.click(menuButton);
		expect(mockProps.setAsideOpen).toHaveBeenCalledTimes(1);

		fireEvent.click(menuButton);
		expect(mockProps.setAsideOpen).toHaveBeenCalledTimes(2);
	});

	it("should toggle profile dropdown menu", () => {
		const mockProps = {
			asideOpen: false,
			setAsideOpen: vi.fn(),
			profileOpen: false,
			setProfileOpen: vi.fn(),
		};

		const { getByRole } = render(
			<Provider store={mockStore}>
				<Navbar {...mockProps} />
			</Provider>
		);

		const profileButton = getByRole("button", { name: /profile/i });

		fireEvent.click(profileButton);
		expect(mockProps.setProfileOpen).toHaveBeenCalledTimes(1);

		fireEvent.click(profileButton);
		expect(mockProps.setProfileOpen).toHaveBeenCalledTimes(2);
	});

	it("should change selected language", async () => {
		const mockProps = {
			asideOpen: false,
			setAsideOpen: vi.fn(),
			profileOpen: false,
			setProfileOpen: vi.fn(),
		};

		const { getByText, getByRole } = render(
			<Provider store={mockStore}>
				<Navbar {...mockProps} />
			</Provider>
		);

		const languageButton = getByRole("button", { name: /language/i });
		fireEvent.click(languageButton);

		const germanOption = getByText(/German/i);
		fireEvent.click(germanOption);

		// we need to get a fresh copy of the state
		const freshState = mockStore.getState();
		expect(freshState.language.selectedLanguage).toBe("de");
	});
});
