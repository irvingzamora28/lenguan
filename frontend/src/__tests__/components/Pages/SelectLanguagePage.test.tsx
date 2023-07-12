import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import SelectLanguagePage from "../../../components/Pages/SelectLanguagePage";
import { BrowserRouter } from "react-router-dom";

describe("SelectLanguagePage", () => {
	it("selects language on click", async () => {
		const { getByLabelText, getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<SelectLanguagePage />
				</BrowserRouter>
			</Provider>
		);

		const languageBox = getByText("French"); // Assuming 'French' is one of the languages in `languages`
		fireEvent.click(languageBox);

		await waitFor(() => {
			expect(getByText("Language selected successfully!")).toBeInTheDocument();
		});
	});
});
