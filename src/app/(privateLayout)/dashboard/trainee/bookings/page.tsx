/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyBookingsQuery } from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hook";
import { IBooking } from "@/types/global";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MyBookings = () => {
  const query: Record<string, any> = {};

  const [page] = useState<number>(1);
  const [size] = useState<number>(10);
  const [sortBy] = useState<string>("");
  const [sortOrder] = useState<string>("");
  const [searchTerm] = useState<string>("");
  // const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  // const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  // const [bookingId, setBookingId] = useState<string>("");

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
//   const meta = data?.meta;

  console.log(bookings);

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
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking?.date}</TableCell>
                  <TableCell className="font-medium">
                    {typeof booking.classScheduleId === "object"
                      ? booking.classScheduleId.title
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {typeof booking.classScheduleId === "object"
                      ? booking.classScheduleId.day
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
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
                  <TableCell className="font-medium">
                    {typeof booking.classScheduleId === "object"
                      ? Array.isArray(booking.classScheduleId.trainers)
                        ? booking.classScheduleId.trainers
                            .map((trainer) =>
                              typeof trainer === "object"
                                ? <span key={trainer?.id} className="bg-green-500 mx-1 p-1">{trainer.name}</span>
                                : trainer
                            )
                            // .join(", ")
                        : "N/A"
                      : "N/A"}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    {/* Edit Button */}
                    <Link href={`/dashboard/edit-meal-category/${booking?.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit2 />
                      </Button>
                    </Link>
                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      //   onClick={() => {
                      //     setDeleteItemId(booking?.id);
                      //     setIsDialogOpen(true);
                      //   }}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBookings;
