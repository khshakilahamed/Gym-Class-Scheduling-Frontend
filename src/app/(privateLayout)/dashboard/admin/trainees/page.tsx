/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteDialog from "@/components/shared/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { USER_ROLE } from "@/constants/userRole";
import { useUsersQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hook";
import { IMeta, IUser } from "@/types/global";
import { calculateRange } from "@/utils/range-calculator";
import { ChevronLeft, ChevronRight, Edit2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AllTrainees = () => {
      const query: Record<string, any> = {};

      const [page, setPage] = useState<number>(1);
      const [size] = useState<number>(10);
      const [sortBy] = useState<string>("");
      const [sortOrder] = useState<string>("");
      const [searchTerm, setSearchTerm] = useState<string>("");
      const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
      const [, setDeleteItemId] = useState<string>("");

      query["limit"] = size;
      query["page"] = page;
      query["sortBy"] = sortBy;
      query["sortOrder"] = sortOrder;

      const debouncedSearchTerm = useDebounced({
            searchQuery: searchTerm,
            delay: 500,
      });

      if (!!debouncedSearchTerm) {
            query["searchTerm"] = debouncedSearchTerm;
      }

      const { data, isLoading } = useUsersQuery({ ...query, role: USER_ROLE.trainee });
      const users = data?.users as IUser[];
      const meta = data?.meta as IMeta;

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

      // Dialog close handler
      const handleCloseDialog = () => {
            setDeleteItemId("");
            setIsDialogOpen(false);
      };

      // Delete confirm
      const handleDeleteConfirm = () => {
            //   mutate(deleteItemId);
            setIsDialogOpen(false);
      };

      // Table items range
      const range = calculateRange(meta?.total, page, size);

      return (
            <div>
                  <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl">Trainees</h2>
                        <Input className="max-w-[300px]" placeholder="Search here" onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                  <Separator className="mb-5" />

                  <Table>
                        <TableCaption>A list of Trainees.</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
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
                                          {users?.map((user) => (
                                                <TableRow key={user._id}>
                                                      <TableCell className={`font-medium}`}>
                                                            {
                                                                  user?.name
                                                            }
                                                      </TableCell>
                                                      <TableCell className={`font-medium}`}>
                                                            {
                                                                  user?.email
                                                            }
                                                      </TableCell>
                                                      <TableCell className={`font-medium}`}>
                                                            {
                                                                  user?.role
                                                            }
                                                      </TableCell>
                                                      <TableCell className="space-x-2 text-right">
                                                            {/* Edit Button */}
                                                            <Link
                                                                  href={`/dashboard/admin/all-users/edit/${user?._id}`}
                                                                  className={`${user?.role !== USER_ROLE.trainer && "hidden"}`}
                                                            >
                                                                  <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        title="Edit User"
                                                                        disabled={user?.role !== USER_ROLE.trainer}
                                                                  >
                                                                        <Edit2 />
                                                                  </Button>
                                                            </Link>
                                                            {/* Delete Button */}
                                                            {/* <Button
                                                                  variant="destructive"
                                                                  size="sm"
                                                                  className={`${user?.isCancel && "hidden"}`}
                                                                  title="Cancel Booking"
                                                                  onClick={() => cancelBooking(user?._id)}
                                                                  disabled={isCancelLoading}
                                                            >
                                                                  <Trash2 />
                                                            </Button> */}
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

                  <DeleteDialog
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        handleCloseDialog={handleCloseDialog}
                        handleDeleteConfirm={handleDeleteConfirm}
                  />
            </div>
      );
};

export default AllTrainees;
