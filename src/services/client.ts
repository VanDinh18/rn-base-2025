import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { userStore } from '@/store/hooks/useUserStore';

type Props = {
  baseURL: string;
  configs?: ServiceConfigs;
};

type ServiceConfigs = {
  timeout: number;
};

function createApiClient({ baseURL, configs }: Props) {
  const client = axios.create({
    baseURL,
    timeout: configs?.timeout ?? 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    async config => {
      try {
        const token = userStore.getState().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting token from storage:', error);
      }

      // Log request for debugging (remove in production)
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });

      return config;
    },
    error => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    },
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    response => {
      // Log successful responses (remove in production)
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });

      return response;
    },
    async error => {
      const originalRequest = error.config;

      // Handle different error scenarios
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401:
            // Unauthorized - clear token and redirect to login

            // You might want to navigate to login screen here
            console.error('Unauthorized access - token cleared');
            break;

          case 403:
            console.error('Forbidden access');
            break;

          case 404:
            console.error('Resource not found');
            break;

          case 500:
            console.error('Server error');
            break;

          default:
            console.error(
              `API Error ${status}:`,
              data?.message || 'Unknown error',
            );
        }
      } else if (error.request) {
        // Network error
        console.error('Network error - no response received:', error.message);
      } else {
        // Request setup error
        console.error('Request setup error:', error.message);
      }

      return Promise.reject(error);
    },
  );

  function dataToParam(data: any) {
    return Object.keys(data)
      .flatMap(k => {
        const key = encodeURIComponent(k);
        let value = data[k];
        if (Array.isArray(value)) {
          return value.map(val => {
            return `${key}[]=${encodeURIComponent(val)}`;
          });
        }
        if (typeof value === 'boolean') {
          value = value ? 1 : 0;
        }
        value = encodeURIComponent(value);
        return `${key}=${value}`;
      })
      .join('&');
  }

  function urlJoinQueries(url: string, queries: any) {
    let sep = '?';
    if (url.includes('?')) {
      sep = '&';
    }
    return `${url}${sep}${dataToParam(queries)}`;
  }

  return {
    client,
    urlJoinQueries,
    get<T>(
      url: string,
      option?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
      return client.get(url, option);
    },
    getWithQueries<T>(
      url: string,
      queries: any,
      option?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
      return client.get(urlJoinQueries(url, queries), option);
    },
    post<T, D = any>(
      url: string,
      data?: D,
      option?: AxiosRequestConfig<D>,
    ): Promise<AxiosResponse<T>> {
      return client.post(url, data, option);
    },
    postFormData<T, D = any>(
      url: string,
      data?: D,
      option?: AxiosRequestConfig<D>,
    ): Promise<AxiosResponse<T>> {
      option = option ?? {};
      return client.post(url, data, {
        ...option,
        headers: {
          ...(option.headers ?? {}),
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    put<T, D>(
      url: string,
      data?: D,
      option?: AxiosRequestConfig<D>,
    ): Promise<AxiosResponse<T>> {
      return client.put(url, data, option);
    },
    delete<T>(
      url: string,
      option?: AxiosRequestConfig<T>,
    ): Promise<AxiosResponse<T>> {
      return client.delete(url, option);
    },
  };
}

export const dummyClient = createApiClient({
  baseURL: 'https://dummyjson.com',
  configs: {
    timeout: 15000,
  },
});
