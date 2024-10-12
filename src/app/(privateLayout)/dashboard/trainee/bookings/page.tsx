/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCancelBookingMutation, useMyBookingsQuery } from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hook";
import { IBooking, IMeta } from "@/types/global";
import { calculateRange } from "@/utils/range-calculator";
import { ChevronLeft, ChevronRight, Edit2, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MyBookings = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [sortBy] = useState<string>("");
  const [sortOrder] = useState<string>("");
  const [searchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useMyBookingsQuery({ ...query });
  const bookings = data?.bookings as IBooking[];
  const meta = data?.meta as IMeta;

  // console.log(bookings);
  const [cancelBooking, { isLoading: isCancelLoading }] = useCancelBookingMutation();

  const totalPage = Math.ceil(meta?.total / size);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  // // Dialog close handler
  // const handleCloseDialog = () => {
  //   setDeleteItemId("");
  //   setIsDialogOpen(false);
  // };

  // // Delete confirm
  // const handleDeleteConfirm = () => {
  //   mutate(deleteItemId);
  //   setIsDialogOpen(false);
  // };

  // Table items range
  const range = calculateRange(meta?.total, page, size);

  return (
    <div>
      <Table>
        <TableCaption>A list of Bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Trainers</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="w-full h-[150px] flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              {bookings?.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className={`font-medium ${booking?.isCancel && "line-through"}`}>{booking?.date}</TableCell>
                  <TableCell className={`font-medium ${booking?.isCancel && "line-through"}`}>
                    {typeof booking.classScheduleId === "object"
                      ? booking.classScheduleId.title
                      : "N/A"}
                  </TableCell>
                  <TableCell className={`font-medium ${booking?.isCancel && "line-through"}`}>
                    {typeof booking.classScheduleId === "object"
                      ? booking.classScheduleId.day
                      : "N/A"}
                  </TableCell>
                  <TableCell className={`font-medium ${booking?.isCancel && "line-through"}`}>
                    {typeof booking.classScheduleId === "object" &&
                      typeof booking.classScheduleId.timeSlotId === "object"
                      ? booking.classScheduleId.timeSlotId.startingTime
                      : "N/A"}
                    -
                    {typeof booking.classScheduleId === "object" &&
                      typeof booking.classScheduleId.timeSlotId === "object"
                      ? booking.classScheduleId.timeSlotId.endingTime
                      : "N/A"}
                  </TableCell>
                  <TableCell className={`font-medium ${booking?.isCancel && "line-through"}`}>
                    {typeof booking.classScheduleId === "object"
                      ? Array.isArray(booking.classScheduleId.trainers)
                        ? booking.classScheduleId.trainers
                          .map((trainer) =>
                            typeof trainer === "object"
                              ? <span key={trainer?._id} className="bg-green-500 mx-1 p-1">{trainer.name}</span>
                              : trainer
                          )
                        // .join(", ")
                        : "N/A"
                      : "N/A"}
                  </TableCell>
                  <TableCell className={`font-medium`}>
                    {
                      booking?.isCancel ? <span className="bg-red-600 px-3 py-1 text-white">Cancelled</span> : <span className="bg-green-600 px-3 py-1 text-white">Active</span>
                    }
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    {/* Edit Button */}
                    <Link
                      href={`/dashboard/edit-meal-category/${booking?._id}`}
                      className={`${booking?.isCancel && "hidden"}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        title="Edit Booking"
                      >
                        <Edit2 />
                      </Button>
                    </Link>
                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className={`${booking?.isCancel && "hidden"}`}
                      title="Cancel Booking"
                      onClick={() => cancelBooking(booking?._id)}
                      disabled={isCancelLoading}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        {range && (
          <TableFooter>
            <TableRow>
              <TableCell>
                Page: {page} | {range?.start} - {range?.end} of {meta?.total} items
              </TableCell>
              <TableCell colSpan={6} className="text-right">
                <div className="space-x-2 inline-block">
                  <Button
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page === totalPage}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default MyBookings;
