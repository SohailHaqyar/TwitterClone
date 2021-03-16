import { AxiosInstance } from "axios";

/**
 * Applies Firebase JWT to all axios calls when available
 */
export function applyAuthHeaderInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("userAccessToken");

    if (token)
      config.headers.Authorization = `Bearer ${JSON.parse(token as string)}`;

    return config;
  });
}
