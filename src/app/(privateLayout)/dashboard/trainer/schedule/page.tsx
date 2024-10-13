"use client";

import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTrainerClassScheduleQuery } from '@/redux/api/scheduleApi';
import { IClassSchedule, ITimeSlot } from '@/types/global';
import { Loader2 } from 'lucide-react';

type ISchedule = {
      sunday?: IClassSchedule[];
      monday?: IClassSchedule[];
      tuesday?: IClassSchedule[];
      wednesday?: IClassSchedule[];
      thursday?: IClassSchedule[];
      friday?: IClassSchedule[];
      saturday?: IClassSchedule[];
}

const TrainerSchedule = () => {
      let schedules: ISchedule = {}

      const { data, isLoading } = useTrainerClassScheduleQuery(null);

      if (Array.isArray(data)) {
            data.forEach((schedule: IClassSchedule) => {
                  const day = schedule.day.toLowerCase() as keyof ISchedule; // Assert that `day` is a valid key
                  schedules = {
                        ...schedules,
                        [day]: schedules[day] ? [...schedules[day]!, schedule] : [schedule],
                  };
            });
      }

      console.log(schedules);

      // Helper function to render schedule content for each day
      const renderScheduleForDay = (day: keyof ISchedule) => (
            <TableCell className="font-medium">
                  {schedules[day] &&
                        schedules[day]!.map((classSchedule: IClassSchedule) => (
                              <p key={classSchedule._id}>
                                    {typeof classSchedule.timeSlotId === 'object' &&
                                          `${classSchedule.timeSlotId.startingTime} - ${classSchedule.timeSlotId.endingTime}`}
                              </p>
                        ))}
            </TableCell>
      );

      return (
            <div>
                  <h2>My Schedule</h2>
                  <Separator className='mb-10'/>
                  <Table>
                        <TableCaption>A list of Schedule.</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Saturday</TableHead>
                                    <TableHead>Sunday</TableHead>
                                    <TableHead>Monday</TableHead>
                                    <TableHead>Tuesday</TableHead>
                                    <TableHead>Wednesday</TableHead>
                                    <TableHead>Thursday</TableHead>
                                    <TableHead>Friday</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {isLoading ? (
                                    <div className="w-full h-[150px] flex justify-center items-center">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </div>
                              ) : (
                                    <TableRow>
                                          {renderScheduleForDay('saturday')}
                                          {renderScheduleForDay('sunday')}
                                          {renderScheduleForDay('monday')}
                                          {renderScheduleForDay('tuesday')}
                                          {renderScheduleForDay('wednesday')}
                                          {renderScheduleForDay('thursday')}
                                          {renderScheduleForDay('friday')}
                                    </TableRow>
                              )}
                        </TableBody>
                  </Table>
            </div>
      );
};

export default TrainerSchedule;