/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteDialog from '@/components/shared/DeleteDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useDeleteTimeSlotMutation, useTimeSlotsQuery } from '@/redux/api/timeSlotApi';
import { Edit2, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const TimeSlots = () => {
      const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
      const [deleteItemId, setDeleteItemId] = useState<string>("");
      const { toast } = useToast();

      const { data, isLoading } = useTimeSlotsQuery({ size: 100 });
      // console.log(data);
      const timeSlots = data?.timeSlots;

      const [deleteTimeSlot, { isLoading: isDeleteLoading }] = useDeleteTimeSlotMutation();

      const handleDelete = async (id: string) => {
            try {
                  const res = await deleteTimeSlot(id);

                  if (res) {
                        toast({
                              title: `✅ Successfully deleted`,
                        })
                  }
            } catch (error: any) {
                  toast({
                        title: `❌ ${error?.data?.message}`,
                  })
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


      return (
            <div>
                  <h2>My Profile</h2>
                  <Separator className='mb-10' />

                  <Table>
                        <TableCaption>A list of Time Slot.</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Start Time</TableHead>
                                    <TableHead>End Time</TableHead>
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
                                          {timeSlots?.map((timeSlot) => (
                                                <TableRow key={timeSlot._id}>
                                                      <TableCell
                                                            className={`font-medium `}
                                                      >
                                                            {timeSlot?.startingTime}
                                                      </TableCell>
                                                      <TableCell
                                                            className={`font-medium `}
                                                      >
                                                            {timeSlot?.endingTime}
                                                      </TableCell>

                                                      <TableCell className="space-x-2 text-right">
                                                            {/* Edit Button */}
                                                            <Link
                                                                  href={`/dashboard/admin/timeslot/edit-timeslot/${timeSlot?._id}`}
                                                            // className={`${timeSlot?.isCancel && "hidden"}`}
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
                                                                  // className={`${timeSlot?.isCancel && "hidden"}`}
                                                                  title="Cancel Time Slot"
                                                                  onClick={() => {
                                                                        setDeleteItemId(timeSlot?._id);
                                                                        setIsDialogOpen(true);
                                                                  }}
                                                                  disabled={isDeleteLoading && deleteItemId === timeSlot?._id}
                                                            >
                                                                  {
                                                                        (isDeleteLoading && deleteItemId === timeSlot?._id) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 />
                                                                  }
                                                            </Button>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </>
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

export default TimeSlots;