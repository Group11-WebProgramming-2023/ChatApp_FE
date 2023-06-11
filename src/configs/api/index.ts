import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CONFIG } from "..";
import { ApiPayload } from "./payload";

const api = axios.create({
  baseURL: CONFIG.APP_URL,
});

interface useCallApiProps {
  endPoint: string;
  method: AxiosRequestConfig["method"];
  payload?: ApiPayload;
  headers?: AxiosRequestConfig["headers"];
  params?: AxiosRequestConfig["params"];
}

interface UseCallApiResponse {
  response: AxiosResponse | null;
  error: unknown;
}

export const useCallApi = async (
  props: useCallApiProps
): Promise<UseCallApiResponse> => {
  const { endPoint, method, payload, headers, params } = props;

  try {
    const response = await api.request({
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    });
    return {
      response: response,
      error: null,
    };
  } catch (error) {
    return {
      response: null,
      error,
    };
  }
};
