import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

import { userStore } from '../Stores/UserStore';

const handleErrors = async (error: AxiosError) => {
  if (!error.response) {
    toast.error('No Server Response');
  }
  const { data } = error.response as AxiosResponse;
  toast.error(`Error: ${data.message}`);
};

class APIService {
  baseUrl: string;
  apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  addToken(config: any) {
    return {
      ...config,
      headers: {
        ...config.headers,
        authorization: userStore.token,
      },
    };
  }

  async get(url: string, config: any = {}) {
    try {
      config = this.addToken(config);
      const get = await this.apiClient.get(url, config);
      return get?.data;
    } catch (error: any) {
      await handleErrors(error);
    }
  }

  async post(url: string, data: any = {}, config: any = {}) {
    try {
      if (url !== '/auth') {
        config = this.addToken(config);
      }
      const post = await this.apiClient.post(url, data, config);
      return post?.data;
    } catch (error: any) {
      await handleErrors(error);
    }
  }
}

export const baseUrl: string = process.env.REACT_APP_API_URL || '';
export const apiService = new APIService(baseUrl);
