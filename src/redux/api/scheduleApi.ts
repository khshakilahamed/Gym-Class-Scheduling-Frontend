/* eslint-disable @typescript-eslint/no-explicit-any */
import { IClassSchedule, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CLASS_SCHEDULE_URL = "/class-Schedule";

const classScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create classSchedule
    createClassSchedule: build.mutation({
      query: (data) => ({
        url: `${CLASS_SCHEDULE_URL}`,
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.classSchedule],
    }),
    // get all classSchedule
    classSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${CLASS_SCHEDULE_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IClassSchedule[], meta: IMeta) => {
        return {
          classSchedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.classSchedule],
    }),
    // get single classSchedule
    classSchedule: build.query({
      query: (id) => ({
        url: `${CLASS_SCHEDULE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.classSchedule],
    }),
    // get trainer classSchedule
    trainerClassSchedule: build.query({
      query: () => ({
        url: `${CLASS_SCHEDULE_URL}/trainer-schedule`,
        method: "GET",
      }),
      providesTags: [tagTypes.classSchedule],
    }),
    // Update classSchedule
    updateClassSchedule: build.mutation({
      query: (data) => {
        const { formData } = data;
        return {
          url: `${CLASS_SCHEDULE_URL}/${data?.id}`,
          method: "PATCH",
          data: formData,
          // contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.classSchedule],
    }),
    // Delete classSchedule
    deleteClassSchedule: build.mutation({
      query: (id) => ({
        url: `${CLASS_SCHEDULE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.classSchedule],
    }),
  }),
});

export const {
  useCreateClassScheduleMutation,
  useClassSchedulesQuery,
  useClassScheduleQuery,
  useTrainerClassScheduleQuery,
  useUpdateClassScheduleMutation,
  useDeleteClassScheduleMutation,
} = classScheduleApi;
