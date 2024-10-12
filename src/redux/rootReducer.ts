import { baseApi } from "./api/baseApi";
import authSliceReducer from "./slices/authSlice";

export const reducer = {
  auth: authSliceReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
