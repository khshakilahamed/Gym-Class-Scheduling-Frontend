/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useCreateBookingMutation } from '@/redux/api/bookingApi';
import { useClassSchedulesQuery } from '@/redux/api/scheduleApi';
import { IClassSchedule } from '@/types/global';
import { daysOfWeek } from '@/utils/daysOfWeek';
import { format, getDay } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type FormInputErrorType = {
      field: string;
      error: boolean;
} | null;

const CreateBooking = () => {
      const [date, setDate] = useState<Date>(new Date());
      const [day, setDay] = useState<string>("");
      const [classSchedules, setClassSchedules] = useState<IClassSchedule[] | []>([]);
      const [classScheduleId, setClassScheduleId] = useState<string>("");
      const [formError, setFormInputError] = useState<FormInputErrorType>(null);
      const { toast } = useToast();

      const query: Record<string, any> = {};

      const [page] = useState<number>(1);
      const [size] = useState<number>(20);
      const [sortBy] = useState<string>("day");
      const [sortOrder] = useState<string>("asc");
      //   const [searchTerm] = useState<string>("");

      query["limit"] = size;
      query["page"] = page;
      query["sortBy"] = sortBy;
      query["sortOrder"] = sortOrder;
      query["day"] = day;

      const { data } = useClassSchedulesQuery({ ...query });
      const [createBooking, { isLoading }] = useCreateBookingMutation();

      useEffect(() => {
            const dayNum = getDay(new Date(date));
            const day = daysOfWeek[dayNum];
            setDay(day);
            setClassScheduleId("");
            setClassSchedules(data?.classSchedules as IClassSchedule[]);
      }, [data?.classSchedules, date]);



      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!date) {
                  return setFormInputError({
                        field: "date",
                        error: true,
                  });
            }
            if (!classScheduleId) {
                  return setFormInputError({
                        field: "classScheduleId",
                        error: true,
                  });
            }

            setFormInputError(null);
            const dbDate = format(date, 'yyyy-MM-dd');

            try {
                  const res = await createBooking({ classScheduleId, date: dbDate }).unwrap();
                  console.log(res);
                  if (res) {
                        toast({
                              title: "✅ Successfully booked",
                        })
                  }
            } catch (error: any) {
                  toast({
                        title: `❌ ${error?.data?.message}`,
                  })
            }
      }

      return (
            <div>
                  <h2 className='text-xl pb-3'>Create booking</h2>

                  <form
                        className='border max-w-min p-5 flex flex-col gap-3'
                        onSubmit={handleSubmit}
                  >
                        <div className='flex flex-col'>
                              <Label className='text-lg'>Select Date</Label>
                              <Popover>
                                    <PopoverTrigger asChild>
                                          <Button
                                                variant={"outline"}
                                                className={cn(
                                                      "w-[280px] justify-start text-left font-normal",
                                                      !date && "text-muted-foreground"
                                                )}
                                          >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PP") : <span>Pick a date</span>}
                                          </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                          <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(day) => setDate(day ?? new Date())} // Handle undefined
                                                initialFocus
                                          />
                                    </PopoverContent>
                              </Popover>
                              {formError &&
                                    formError["field"] === "date" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Date is required</p>
                                    )}
                        </div>
                        <div className='flex flex-col gap-2'>
                              <Label className='text-lg'>Select Schedule</Label>
                              <Select onValueChange={(value) => setClassScheduleId(value)}>
                                    <SelectTrigger>
                                          <SelectValue placeholder="Select a schedule" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Schedules</SelectLabel>
                                                {
                                                      classSchedules?.map(schedule =>
                                                            <SelectItem
                                                                  key={schedule?._id}
                                                                  value={schedule?._id}
                                                            >
                                                                  {schedule?.title}
                                                                  - ({typeof schedule?.timeSlotId === "object" && schedule?.timeSlotId?.startingTime} - {typeof schedule?.timeSlotId === "object" && schedule?.timeSlotId?.endingTime})
                                                            </SelectItem>
                                                      )
                                                }
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              {formError &&
                                    formError["field"] === "classScheduleId" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Class schedule is required</p>
                                    )}
                        </div>

                        <Button
                              className='bg-green-600 mt-5'
                              disabled={isLoading}
                        >
                              {
                                    isLoading ? "Submitting..." : "Submit"
                              }

                        </Button>
                  </form>
            </div>
      );
};

export default CreateBooking;