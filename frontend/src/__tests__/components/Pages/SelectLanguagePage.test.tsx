import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import SelectLanguagePage from "../../../components/Pages/SelectLanguagePage";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { setLanguages } from "../../../redux/languageSlice";

vi.mock("../../utils/languages", () => {
	return {
		getLanguages: (languages: any, dispatch: any) => {
			dispatch(setLanguages(mockLanguageData));
		},
	};
});

const mockLanguageData = [
	{ _id: "1", name: "English", code: "en" },
	{ _id: "2", name: "Spanish", code: "es" },
	{ _id: "3", name: "French", code: "fr" },
];

describe("SelectLanguagePage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("selects language on click", async () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<SelectLanguagePage />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() => expect(getByText("French")).toBeInTheDocument());

		const languageBox = getByText("French");
		fireEvent.click(languageBox);

		await waitFor(() => {
			expect(getByText("Language selected successfully!")).toBeInTheDocument();
		});
	});
});
