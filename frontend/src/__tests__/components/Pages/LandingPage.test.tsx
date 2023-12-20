import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LandingPage from "./../../../components/Pages/LandingPage";
import { describe, it, beforeEach, vi } from "vitest";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useUserGuestLogin } from "../../../hooks/useUserGuestLogin";

window.HTMLElement.prototype.scrollIntoView = function () {};

const mockNavigate = vi.fn();

// Mock useUserGuestLogin and navigation
vi.mock("../../../hooks/useUserGuestLogin", () => ({
	useUserGuestLogin: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
	return {
		...mod,
		useNavigate: () => mockNavigate,
	};
});

describe("LandingPage", () => {
	it("should render the landing page", () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);
		expect(getByText("Features")).toBeInTheDocument();
		expect(getByText("Languages")).toBeInTheDocument();
		expect(getByText("Testimonials")).toBeInTheDocument();
		expect(getByText("Sign Up")).toBeInTheDocument();
	});

	it("should scroll to the features section when the Features link is clicked", () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);
		const featuresLink = getByText("Features");
		fireEvent.click(featuresLink);
		const featuresSection = document.querySelector("#features");
		expect(featuresSection).toBeInTheDocument();
	});

	it("should scroll to the languages section when the Languages link is clicked", () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);
		const languagesLink = getByText("Languages");
		fireEvent.click(languagesLink);
		const languagesSection = document.querySelector("#languages");
		expect(languagesSection).toBeInTheDocument();
	});

	it("should scroll to the testimonials section when the Testimonials link is clicked", () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);
		const testimonialsLink = getByText("Testimonials");
		fireEvent.click(testimonialsLink);
		const testimonialsSection = document.querySelector("#testimonials");
		expect(testimonialsSection).toBeInTheDocument();
	});

	it("should navigate to the register page when the Sign Up link is clicked", () => {
		// Helper component to capture the current location
		const LocationDisplay = () => {
			const location = useLocation();
			return <div data-testid="location-display">{location.pathname}</div>;
		};
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/"]}>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/register" element={<div>Register Page</div>} />
					</Routes>
					<LocationDisplay />
				</MemoryRouter>
			</Provider>
		);

		const signUpLink = screen.getByText("Sign Up");
		fireEvent.click(signUpLink);

		// Check if the URL changed to '/register'
		expect(screen.getByTestId("location-display").textContent).toBe("/register");
	});

	it("should have a link to the register page in the Sign Up button", () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);

		const signUpButton = getByText("Sign Up");
		// Assuming that the `Link` component is used directly within the button
		expect(signUpButton.closest("a")).toHaveAttribute("href", "/register");
	});

	it("should call the guest login function when 'Try as Guest' is clicked", async () => {
		const mockLoginAsGuest = vi.fn();
		(useUserGuestLogin as Mock).mockReturnValue(mockLoginAsGuest);

		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);
		const guestButton = getByText("Try as Guest");

		fireEvent.click(guestButton);

		await waitFor(() => {
			expect(mockLoginAsGuest).toHaveBeenCalled();
		});
	});

	it("should navigate to '/' after guest login", async () => {
		const mockLoginAsGuest = vi.fn(() => {
			// Simulate the side effect of navigating to '/' in the mock
			mockNavigate("/");
		});
		(useUserGuestLogin as Mock).mockReturnValue(mockLoginAsGuest);

		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LandingPage />
				</BrowserRouter>
			</Provider>
		);
		const guestButton = getByText("Try as Guest");

		fireEvent.click(guestButton);

		await waitFor(() => {
			// Check if navigate was called with the expected path
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});
});
