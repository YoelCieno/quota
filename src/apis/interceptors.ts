import type { AxiosError, AxiosInstance } from "axios";
import { toast } from "vue3-toastify";


const interceptorRequest = (apiManager: AxiosInstance) => {
  apiManager.interceptors.request.use((requestConfig) => requestConfig, (error: AxiosError) => {
    toast('Sorry, the service request has failed!', { autoClose: 1250, type: 'error' });

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
      toast('Sorry, the service response has failed!', { autoClose: 1250, type: 'error' });

      return error.message;
    },
  );
};

export {
  interceptorRequest,
  interceptorResponse,
}