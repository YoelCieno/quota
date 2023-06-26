import axios from 'axios';
import { interceptorRequest, interceptorResponse } from './interceptors';

const mockiApi = axios.create({ baseURL: import.meta.env.VITE_MOCK_API });

interceptorRequest(mockiApi);
interceptorResponse(mockiApi);

export {
  mockiApi,
}