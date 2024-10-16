import { authKey } from "@/constants/storageKey";
import { getNewAccessToken } from "@/services/auth.service";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/global";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
      function (config) {
            // Do something before request is sent
            const accessToken = getFromLocalStorage(authKey);
            if (accessToken) {
                  config.headers.Authorization = accessToken;
            }

            return config;
      },
      function (error) {
            // Do something with request error
            return Promise.reject(error);
      }
);

// Add a response interceptor
instance.interceptors.response.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (response): any {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            const responseObject: ResponseSuccessType = {
                  data: response?.data?.data,
                  meta: response?.data?.meta,
            };

            return responseObject;
      },
      async function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const config = error?.config;

            // console.log(error);

            if (error?.response?.status === 403 && !config?.sent) {
                  if (error?.response?.status === 500 && !config?.sent) {
                        config.sent = true;
                        const response = await getNewAccessToken();
                        const accessToken = response?.data?.accessToken;
                        config.headers["Authorization"] = accessToken;
                        setToLocalStorage(authKey, accessToken);
                        return instance(config);
                  } else {
                        console.log("From instance ");
                        const responseObject: IGenericErrorResponse = {
                              statusCode: error?.response?.data?.statusCode || 500,
                              message: error?.response?.data?.message || "Something went wrong",
                              errorDetails: error?.response?.data?.message,
                        };
                        return responseObject;
                  }
            }
            return Promise.reject(error);
      }
);

export { instance };
