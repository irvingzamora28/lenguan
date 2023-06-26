import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { LoginService } from './../../services/LoginService';
import api from './../../utils/api';
import { refreshCsrfToken } from './../../utils/csrf-token';

vi.mock('./../../utils/api');
vi.mock('./../../utils/csrf-token');

describe('LoginService', () => {
    const mockLoginData = {
        email: 'test@example.com',
        password: 'password',
    };

    const mockApiResponse = {
        data: {
            token: 'mockAccessToken',
            user: { id: 123, name: 'John Doe', email: 'test@example.com' },
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call the API with the correct data when login is called', async () => {
        (api.post as Mock).mockResolvedValue(mockApiResponse);

        await LoginService.login(mockLoginData);

        expect(api.post).toHaveBeenCalledWith('/api/login', mockLoginData);
    });

    it('should throw an error when the API request fails', async () => {
        (api.post as Mock).mockRejectedValue(new Error('API request failed'));

        await expect(LoginService.login(mockLoginData)).rejects.toThrow('API request failed');
    });

    it('should call the refreshCsrfToken function when refreshToken is called', async () => {
        await LoginService.refreshToken();

        expect(refreshCsrfToken).toHaveBeenCalled();
    });

    it('should throw an error when refreshing the CSRF token fails', async () => {
        (refreshCsrfToken as Mock).mockRejectedValue(new Error('Refreshing CSRF token failed'));

        await expect(LoginService.refreshToken()).rejects.toThrow('Refreshing CSRF token failed');
    });
});
