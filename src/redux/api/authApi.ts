import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { UserInfo } from "@/types/global";
import { userLoggedIn } from "../slices/authSlice";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const accessToken = result?.data?.accessToken;
      //   console.log(accessToken);
        storeUserInfo(accessToken);
        const userInfo: UserInfo | null = getUserInfo();
        // console.log(getUserInfo())

        dispatch(
          userLoggedIn({
            accessToken: result.data.accessToken,
            user: {
              userId: userInfo?.userId,
              email: userInfo?.email,
              role: userInfo?.role,
            },
          })
        );
      },

      invalidatesTags: [tagTypes.auth],
    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data: registerData,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const accessToken = result?.data?.accessToken;
        // console.log(accessToken);
        storeUserInfo(accessToken);
        const userInfo: UserInfo | null = getUserInfo();
        // console.log(getUserInfo())

        dispatch(
          userLoggedIn({
            accessToken: result.data.accessToken,
            user: {
              userId: userInfo?.userId,
              email: userInfo?.email,
              role: userInfo?.role,
            },
          })
        );
      },
      
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;
