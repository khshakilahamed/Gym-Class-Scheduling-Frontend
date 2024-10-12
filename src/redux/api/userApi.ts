/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMeta, IUser } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create trainer
    createTrainer: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-trainer`,
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // get all user
    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${USER_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    // get single user
    user: build.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // Update user
    updateUser: build.mutation({
      query: (data) => {
        const { formData } = data;
        return {
          url: `${USER_URL}/update-user/${data?.id}`,
          method: "PATCH",
          data: formData,
          // contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    // Delete user
    // deleteUser: build.mutation({
    //   query: (id) => ({
    //     url: `${USER_URL}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.user],
    // }),
  }),
});

export const {
  useCreateTrainerMutation,
  useUsersQuery,
  useUserQuery,
  useUpdateUserMutation,
  // useDeleteUserMutation,
} = userApi;
