// csrfToken.test.ts
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { getCsrfToken, refreshCsrfToken } from '../../utils/csrf-token';
import { describe, it, beforeEach, afterEach, expect, vi, Mocked } from "vitest";

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('getCsrfToken', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return the CSRF token if found', async () => {
    const csrfToken = 'test-token';
    const metaTag = `<meta name="csrf-token" content="${csrfToken}" />`;
    document.body.innerHTML = metaTag;

    const token = await getCsrfToken();
    expect(token).toEqual(csrfToken);
  });

  it('should throw an error if CSRF token is not found', async () => {
    expect.assertions(1);
    try {
      await getCsrfToken();
    } catch (e:any) {
      expect(e.message).toEqual('CSRF token not found');
    }
  });
});

describe('refreshCsrfToken', () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
    document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  it('should refresh the CSRF token and update the meta tag', async () => {
    const csrfToken = 'test-token';
    const csrfCookie = `XSRF-TOKEN=${csrfToken}`;
    const metaTag = `<meta name="csrf-token" content="old-token" />`;
    document.body.innerHTML = metaTag;
    document.cookie = csrfCookie;

    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await refreshCsrfToken();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/sanctum/csrf-cookie', { withCredentials: true });

    const updatedMetaTag = document.querySelector('meta[name="csrf-token"]');
    expect(updatedMetaTag).toHaveAttribute('content', csrfToken);
  });

  it('should create a new meta tag if not found and set the CSRF token', async () => {
    const csrfToken = 'test-token';
    const csrfCookie = `XSRF-TOKEN=${csrfToken}`;
    document.cookie = csrfCookie;

    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await refreshCsrfToken();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/sanctum/csrf-cookie', { withCredentials: true });

    const newMetaTag = document.querySelector('meta[name="csrf-token"]');
    expect(newMetaTag).toHaveAttribute('content', csrfToken);
  });

  it('should log an error if the request fails', async () => {
    const error = new Error('Request failed');
    mockedAxios.get.mockRejectedValueOnce(error);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await refreshCsrfToken();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/sanctum/csrf-cookie', { withCredentials: true });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);

    consoleErrorSpy.mockRestore();
  });
});
