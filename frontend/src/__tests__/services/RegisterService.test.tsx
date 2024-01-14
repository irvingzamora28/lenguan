import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { RegisterService } from "../../services/RegisterService";
import api from "../../utils/api";

vi.mock("./../../utils/api");

describe("RegisterService", () => {
	const mockRegisterData = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		guest_data: null,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("registers user successfully", async () => {
		const mockApiResponse = {
			status: 201,
			data: {
				message: "Welcome! Please check your email to verify your account. Meantime you can have access, enjoy!",
			},
		};

		// Mock successful response
		(api.post as Mock).mockResolvedValue(mockApiResponse);

		const response = await RegisterService.register(mockRegisterData);

		// Assert status code
		expect(response.status).toBe(201);

		// Assert API call
		expect(api.post).toHaveBeenCalledWith("/api/register", mockRegisterData);
	});

	it("handles registration error", async () => {
		const mockError = new Error("Network error");

		// Mock failed network call
		(api.post as Mock).mockRejectedValueOnce(mockError);

		await expect(RegisterService.register(mockRegisterData)).rejects.toThrow(mockError);
	});
});
