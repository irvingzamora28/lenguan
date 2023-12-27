import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import SelectLanguagePage from "../../../components/Pages/SelectLanguagePage";
import authReducer, { updateAuthUser } from "../../../redux/authSlice";
import languageReducer, { setLanguage } from "../../../redux/languageSlice";
import { Store, configureStore } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LanguageService } from "../../../services/LanguageService";
import { User } from "../../../types";
import { Language } from "../../../types/language";

const mockNavigate = vi.fn();
const mockConsoleError = vi.spyOn(console, "error");

vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
	return {
		...mod,
		useNavigate: () => mockNavigate,
		NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
	};
});

vi.mock("./../../../redux/authSlice", async () => {
	const actual: typeof import("./../../../redux/authSlice") = await vi.importActual("./../../../redux/authSlice");
	return {
		...actual,
		actions: {
			updateAuthUser: vi.fn(),
		},
	};
});

const mockPostRequest = vi.fn();

vi.mock("../../../hooks/api/useApi", () => ({
	useApi: () => ({
		postRequest: mockPostRequest,
	}),
}));

vi.mock("react-toastify", async () => {
	const mod = await vi.importActual<typeof import("react-toastify")>("react-toastify");
	return {
		...mod,
		toast: {
			...mod.toast,
			success: vi.fn(),
			error: vi.fn(),
		},
		ToastContainer: () => <div></div>,
	};
});

vi.mock("../../../services/LanguageService", () => ({
	LanguageService: {
		updateLanguage: vi.fn(),
	},
}));

describe("SelectLanguagePage", () => {
	const mockUser = createMockUser();
	const mockLanguageData = createMockLanguageData();
	const mockPreloadedState = createMockPreloadedState(mockUser, mockLanguageData);
	const mockStore = configureMockStore(mockPreloadedState);

	beforeEach(() => {
		vi.resetModules();
	});

	it("should render the SelectLanguagePage", () => {
		const { getByText } = renderComponent(mockStore);

		expect(getByText(new RegExp(mockPreloadedState.language.selectedLanguage.name, "i"))).toBeInTheDocument();
	});

	it("should select a language", async () => {
		const { getByText } = renderComponent(mockStore);

		mockNavigate("/");

		const language = mockLanguageData[0];
		const languageButton = getByText(new RegExp(language.name, "i"));
		fireEvent.click(languageButton);

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});
	it("should update the selected language and user language", async () => {
		const mockLanguage = mockLanguageData[0];
		const mockUpdatedUser = { ...mockUser, language: mockLanguage };
		const mockDispatch = vi.spyOn(mockStore, "dispatch");
		(LanguageService.updateLanguage as Mock).mockResolvedValue({ data: mockUpdatedUser });

		const { getByText } = renderComponent(mockStore);

		const languageButton = getByText(new RegExp(mockLanguage.name, "i"));
		fireEvent.click(languageButton);

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(setLanguage(mockLanguage));
			expect(mockDispatch).toHaveBeenCalledWith(updateAuthUser({ user: mockUpdatedUser }));
			expect(LanguageService.updateLanguage).toHaveBeenCalledWith(mockLanguage._id, mockPostRequest);
			expect(toast.success).toHaveBeenCalledWith("Language selected successfully!", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			});
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});

	it("should handle error when updating language", async () => {
		(LanguageService.updateLanguage as Mock).mockRejectedValue(new Error("Failed to update language"));

		const { getByText } = renderComponent(mockStore);

		const languageButton = getByText(new RegExp(mockLanguageData[0].name, "i"));
		fireEvent.click(languageButton);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Error updating language. Please try again.");
		});
	});

	it("should handle null user when updating language", async () => {
		// Create a new mock store with the user set to null
		const localPreloadedState = {
			...mockPreloadedState,
			auth: {
				...mockPreloadedState.auth,
				user: null, // override user to be null
			},
		};

		const localMockStore = configureStore({
			reducer: {
				auth: authReducer,
				language: languageReducer,
			},
			preloadedState: localPreloadedState,
		});

		const { getByText } = render(
			<Provider store={localMockStore}>
				<BrowserRouter>
					<SelectLanguagePage />
				</BrowserRouter>
			</Provider>
		);

		mockNavigate("/");

		const languageButton = getByText(new RegExp(mockLanguageData[0].name, "i"));
		fireEvent.click(languageButton);

		await waitFor(() => {
			expect(mockConsoleError).toHaveBeenCalledWith("User is null, cannot update language");
		});
	});
});

function renderComponent(store: Store): ReturnType<typeof render> {
	return render(
		<Provider store={store}>
			<BrowserRouter>
				<SelectLanguagePage />
			</BrowserRouter>
		</Provider>
	);
}

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

function createMockLanguageData() {
	return [
		{ _id: "1", name: "English", code: "en" },
		{ _id: "2", name: "Spanish", code: "es" },
		{ _id: "3", name: "French", code: "fr" },
		{ _id: "4", name: "German", code: "de" },
	];
}

function createMockPreloadedState(user: User, languages: Language[]) {
	return {
		auth: {
			user: user,
			isAuthenticated: true,
			isGuest: false,
			isLoading: false,
			token: null,
			error: null,
		},
		language: {
			selectedLanguage: languages[3],
			languages: languages,
			courseProgress: {},
		},
	};
}

function configureMockStore(preloadedState: any): Store {
	return configureStore({
		reducer: {
			auth: authReducer,
			language: languageReducer,
		},
		preloadedState: preloadedState,
	});
}
