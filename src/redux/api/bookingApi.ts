/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/booking";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create booking
    createBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // get all bookings
    bookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BOOKING_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    // get my bookings
    myBookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BOOKING_URL}/my-bookings`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    // get single booking
    booking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    // Update Booking
    updateBooking: build.mutation({
      query: (data) => {
        const { formData } = data;
        return {
          url: `${BOOKING_URL}/${data?.id}`,
          method: "PATCH",
          data: formData,
          // contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.booking],
    }),
    // Delete Booking
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useBookingsQuery,
  useBookingQuery,
  useMyBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
