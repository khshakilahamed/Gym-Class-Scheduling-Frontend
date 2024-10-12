/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMeta, ITimeSlot } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TIME_SLOT_URL = "/timeslot";

const timeSlotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create timeslot
    createTimeSlot: build.mutation({
      query: (data) => ({
        url: `${TIME_SLOT_URL}`,
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),
    // get all timeslot
    timeSlots: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${TIME_SLOT_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ITimeSlot[], meta: IMeta) => {
        return {
          timeSlots: response,
          meta,
        };
      },
      providesTags: [tagTypes.timeSlot],
    }),
    // get single timeslot
    timeSlot: build.query({
      query: (id) => ({
        url: `${TIME_SLOT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.timeSlot],
    }),
    // Update timeslot
    updateTimeSlot: build.mutation({
      query: (data) => {
        const { formData } = data;
        return {
          url: `${TIME_SLOT_URL}/${data?.id}`,
          method: "PATCH",
          data: formData,
          // contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.timeSlot],
    }),
    // Delete timeslot
    deleteTimeSlot: build.mutation({
      query: (id) => ({
        url: `${TIME_SLOT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),
  }),
});

export const {
  useCreateTimeSlotMutation,
  useTimeSlotsQuery,
  useTimeSlotQuery,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = timeSlotApi;
