import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { render, fireEvent, screen, getByLabelText, waitFor } from "@testing-library/react";
import FeedbackModal from "../../../../components/Items/Misc/FeedbackModal";
import { FormSubmitService } from "../../../../services/FormSubmitService";

vi.mock("../../../../services/FormSubmitService", () => ({
	FormSubmitService: {
		submitFeedbackForm: vi.fn(() => Promise.resolve({ data: { success: true } })),
	},
}));

describe("FeedbackModal", () => {
	it("renders feedback form", () => {
		render(<FeedbackModal closeModal={vi.fn()} />);

		expect(screen.getByLabelText("Other thoughts or suggestions:")).toBeInTheDocument();
	});

	it("submits form and calls closeModal on success", async () => {
		const closeModal = vi.fn();

		const { getByLabelText, getByText } = render(<FeedbackModal closeModal={closeModal} />);

		fireEvent.change(getByLabelText("Other thoughts or suggestions:"), { target: { value: "Test feedback" } });
		fireEvent.click(getByText(/submit feedback/i));
		expect(FormSubmitService.submitFeedbackForm).toHaveBeenCalledWith({
			general_feedback: "Test feedback",
		});
	});

	it("calls closeModal on success", async () => {
		const closeModal = vi.fn();

		const { getByLabelText, getByText } = render(<FeedbackModal closeModal={closeModal} />);

		// populate and submit form
		fireEvent.change(getByLabelText("Other thoughts or suggestions:"), { target: { value: "Test feedback" } });
		fireEvent.click(getByText(/submit feedback/i));

		await waitFor(() => {
			fireEvent.click(getByText(/close/i));
			expect(closeModal).toHaveBeenCalled();
		});
	});
});
