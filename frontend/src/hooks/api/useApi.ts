import api from '../../utils/api';
import { useAuthToken } from '../../redux/hooks';
import { AxiosRequestConfig } from 'axios';

export const useApi = () => {
    const token = useAuthToken();

    const getRequest = async (url: string, config: AxiosRequestConfig = {}) => {
      return api.get(url, { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } });
    };

    const postRequest = async (url: string, data = {}, config: AxiosRequestConfig = {}) => {
      return api.post(url, data, { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } });
    };

    return { getRequest, postRequest };
  };
