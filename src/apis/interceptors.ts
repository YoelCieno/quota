import type { AxiosError, AxiosInstance } from "axios";


const interceptorRequest = (apiManager: AxiosInstance) => {
  apiManager.interceptors.request.use((requestConfig) => requestConfig, (error: AxiosError) => {
    return Promise.reject(error);
  });
};

const interceptorResponse = (apiManager: AxiosInstance) => {
  apiManager.interceptors.response.use((response) => response,
    (error: AxiosError) => {
      if (error.response) {
        return Promise.reject(error.response);
      }
      if (error.request) {
        return Promise.reject(error.request);
      }

      return error.message;
    },
  );
};

export {
  interceptorRequest,
  interceptorResponse,
}