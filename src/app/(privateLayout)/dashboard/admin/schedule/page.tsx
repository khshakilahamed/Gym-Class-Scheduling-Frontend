"use client";

import DeleteDialog from '@/components/shared/DeleteDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useClassSchedulesQuery, useDeleteClassScheduleMutation } from '@/redux/api/scheduleApi';
import { IClassSchedule } from '@/types/global';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type ISchedule = {
      sunday?: IClassSchedule[];
      monday?: IClassSchedule[];
      tuesday?: IClassSchedule[];
      wednesday?: IClassSchedule[];
      thursday?: IClassSchedule[];
      friday?: IClassSchedule[];
      saturday?: IClassSchedule[];
}

const ClassSchedules = () => {
      let schedules: ISchedule = {};
      const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
      const [deleteItemId, setDeleteItemId] = useState<string>("");
      const { toast } = useToast();

      const { data, isLoading } = useClassSchedulesQuery({ size: 1000 });
      const classSchedules = data?.classSchedules;

      const [deleteClassSchedule, { isLoading: isDeleteClassScheduleLoading }] = useDeleteClassScheduleMutation();

      if (Array.isArray(classSchedules)) {
            classSchedules.forEach((schedule: IClassSchedule) => {
                  const day = schedule.day.toLowerCase() as keyof ISchedule; // Assert that `day` is a valid key
                  schedules = {
                        ...schedules,
                        [day]: schedules[day] ? [...schedules[day]!, schedule] : [schedule],
                  };
            });
      };

      const handleDelete = async (id: string) => {
            try {
                  const res = await deleteClassSchedule(id).unwrap();

                  if (res) {
                        toast({
                              title: `✅ Successfully deleted`,
                        })
                  }
            } catch (error: unknown) {
                  // Type guard to check if error has 'data' and 'message' properties
                  if (typeof error === 'object' && error !== null && 'data' in error && (error as { data: { message: string } }).data) {
                        const errorMessage = (error as { data: { message: string } }).data.message || 'An unexpected error occurred';
                        toast({
                              title: `❌ ${errorMessage}`,
                        });
                  } else {
                        toast({
                              title: `❌ An unexpected error occurred`,
                        });
                  }
            }
      }

      // Dialog close handler
      const handleCloseDialog = () => {
            setDeleteItemId("");
            setIsDialogOpen(false);
      };

      // Delete confirm
      const handleDeleteConfirm = () => {
            handleDelete(deleteItemId);
            setIsDialogOpen(false);
      };

      // Helper function to render schedule content for each day
      const renderScheduleForDay = (day: keyof ISchedule) => (
            <TableCell className="font-medium">
                  {schedules[day] &&
                        schedules[day]!.map((classSchedule: IClassSchedule) => (
                              <p key={classSchedule._id} className='my-1'>
                                    {typeof classSchedule.timeSlotId === 'object' &&
                                          `${classSchedule.timeSlotId.startingTime} - ${classSchedule.timeSlotId.endingTime}`}
                                    <Button
                                          className='bg-red-600 p-2 m-0'
                                          onClick={() => {
                                                setDeleteItemId(classSchedule._id);
                                                setIsDialogOpen(true);
                                          }}
                                          disabled={isDeleteClassScheduleLoading && deleteItemId === classSchedule?._id}
                                    >
                                          {
                                                (isDeleteClassScheduleLoading && deleteItemId === classSchedule?._id) ?
                                                      <Loader2
                                                            className="mr-2 h-4 w-4 animate-spin"
                                                      />
                                                      : "X"
                                          }
                                    </Button>
                              </p>
                        ))}
            </TableCell>
      );

      return (
            <div>
                  <h2>My Schedule</h2>
                  <Separator className='mb-10' />
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

                  <DeleteDialog
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        handleCloseDialog={handleCloseDialog}
                        handleDeleteConfirm={handleDeleteConfirm}
                  />
            </div>
      );
};

export default ClassSchedules;