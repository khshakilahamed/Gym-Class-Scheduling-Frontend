/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTimeSlotQuery, useUpdateTimeSlotMutation } from '@/redux/api/timeSlotApi';
import { calculateTimeDifference } from '@/utils/calculateTimeDifference';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type FormInputErrorType = {
      field: string;
      error: boolean;
} | null;

interface ILoginData {
      startingTime: string;
      endingTime: string;
}

const EditTimeSlot = ({ params }: { params: any }) => {
      const { id } = params;
      const initialLoginData: ILoginData = {
            startingTime: "",
            endingTime: "",
      };
      const [formData, setFormData] = useState<ILoginData>({ ...initialLoginData });
      const [formError, setFormInputError] = useState<FormInputErrorType>(null);
      const [isInitial, setIsInitial] = useState<boolean>(true);
      const { toast } = useToast();

      const { data } = useTimeSlotQuery(id);

      // console.log(data);

      useEffect(() => {
            if (data && isInitial) {
                  setFormData({
                        startingTime: data?.startingTime,
                        endingTime: data?.endingTime,
                  })
                  setIsInitial(false)
            }
      }, [data, isInitial]);

      const [updateTimeSlot, { isLoading }] = useUpdateTimeSlotMutation();

      //   get input value
      const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
            }));
      };

      //   submit handler
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!formData["startingTime"]) {
                  return setFormInputError({
                        field: "startingTime",
                        error: true,
                  });
            }
            if (!formData["endingTime"]) {
                  return setFormInputError({
                        field: "endingTime",
                        error: true,
                  });
            }

            const timeDifference = calculateTimeDifference(formData["startingTime"], formData["endingTime"]);

            // console.log(timeDifference);

            if (timeDifference !== 2) {
                  toast({
                        title: `❌ Time Difference should be exactly 2 hours`,
                  });
                  return;
            }

            setFormInputError(null);

            try {
                  const updatedData = {
                        formData,
                        id: id,
                  }
                  const res = await updateTimeSlot(updatedData).unwrap();

                  console.log(res);

                  if (res) {
                        toast({
                              title: "✅ Successfully created",
                        })
                  }

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                  toast({
                        title: `❌ ${error?.data?.message}`,
                  })
            }
      };

      return (
            <div>
                  <h2 className='text-xl pb-3'>Create booking</h2>

                  <form
                        className="flex flex-col gap-3 md:gap-7 mt-5 md:mt-10 max-w-min border p-5"
                        onSubmit={handleSubmit}
                  >
                        <div>
                              <Label className="text-lg">Name:</Label>
                              <Input
                                    type="time"
                                    name="startingTime"
                                    value={formData["startingTime"]}
                                    placeholder="Starting Time 24 Format"
                                    className="w-[300px]"
                                    onChange={handleOnchange}
                                    required
                              />
                              {formError &&
                                    formError["field"] === "startingTime" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Starting time is required</p>
                                    )}
                        </div>
                        <div>
                              <Label className="text-lg">Name:</Label>
                              <Input
                                    type="time"
                                    name="endingTime"
                                    value={formData["endingTime"]}
                                    placeholder="Ending Time is 24 format"
                                    className="w-[300px]"
                                    onChange={handleOnchange}
                                    required
                              />
                              {formError &&
                                    formError["field"] === "endingTime" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Ending time is required</p>
                                    )}
                        </div>

                        <div>
                              <Button
                                    className=" bg-green-600"
                                    disabled={isLoading}
                              >
                                    {isLoading ? (
                                          <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                          </>
                                    ) : (
                                          "Update"
                                    )}
                              </Button>
                        </div>
                  </form>
            </div>
      );
};

export default EditTimeSlot;