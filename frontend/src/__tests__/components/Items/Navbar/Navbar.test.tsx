import React, { PropsWithChildren } from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../../redux/authSlice";
import languageReducer from "../../../../redux/languageSlice";
import Navbar from "../../../../components/Items/Navbar/Navbar";
import { vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
	return {
		...mod,
		useNavigate: () => mockNavigate,
	};
});

describe("Navbar", () => {
	const mockProps = {
		asideOpen: false,
		setAsideOpen: vi.fn(),
		profileOpen: false,
		setProfileOpen: vi.fn(),
	};

	const mockUser = { id: 123, name: "John Doe", email: "test@example.com", native_language_code: "en", learning_language: { _id: "4", name: "German", code: "de", special_characters: ["ü", "ö", "ä", "ß"] } };

	const mockLanguageData = [
		{ _id: "1", name: "English", code: "en", special_characters: [] },
		{ _id: "2", name: "Spanish", code: "es", special_characters: ["ñ", "¿", "¡", "á", "é", "í", "ó", "ú"] },
		{ _id: "3", name: "French", code: "fr", special_characters: ["é", "è", "ê", "â", "ç", "à"] },
		{ _id: "4", name: "German", code: "de", special_characters: ["ü", "ö", "ä", "ß"] },
	];

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

	it("should render the Navbar", () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<Navbar {...mockProps} />
			</Provider>
		);
		expect(getByText("Lenguan")).toBeInTheDocument();
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
});
