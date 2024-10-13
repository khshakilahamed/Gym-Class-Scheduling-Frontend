/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SelectInput from '@/components/shared/SelectInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { USER_ROLE } from '@/constants/userRole';
import { useToast } from '@/hooks/use-toast';
import { useCreateClassScheduleMutation } from '@/redux/api/scheduleApi';
import { useTimeSlotsQuery } from '@/redux/api/timeSlotApi';
import { useUsersQuery } from '@/redux/api/userApi';
import { daysOfWeek } from '@/utils/daysOfWeek';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type FormInputErrorType = {
      field: string;
      error: boolean;
} | null;

interface ILoginData {
      title: string;
      day: string;
      maxTrainees: number,
      trainers: string[],
      timeSlotId: string,
}

const CreateSchedule = () => {
      const initialLoginData: ILoginData = {
            title: "",
            day: "",
            maxTrainees: 10,
            trainers: [],
            timeSlotId: "",
      };
      const [formData, setFormData] = useState({ ...initialLoginData });
      const [formError, setFormInputError] = useState<FormInputErrorType>(null);
      const [trainers, setTrainers] = React.useState<string[]>([])
      const { toast } = useToast();

      const { data } = useUsersQuery({ size: 1000, role: USER_ROLE.trainer, sortOrder: 'asc' });
      const users = data?.users || [];

      const { data: timeSlotsData } = useTimeSlotsQuery({ size: 1000, sortOrder: 'asc' });
      const timeSlots = timeSlotsData?.timeSlots || [];

      const [createClassSchedule, { isLoading }] = useCreateClassScheduleMutation();

      // console.log(formData);

      useEffect(() => {
            setFormData((prevFormData) => ({
                  ...prevFormData,
                  trainers: trainers
            }));
      }, [trainers]);

      //   get input value
      const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
            }));
      };

      const handleSelect = (name: string, value: string) => {
            setFormData({
                  ...formData,
                  [name]: value
            })
      }

      //   submit handler
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!formData["title"]) {
                  return setFormInputError({
                        field: "title",
                        error: true,
                  });
            }
            if (!formData["day"]) {
                  return setFormInputError({
                        field: "day",
                        error: true,
                  });
            }
            if (formData["maxTrainees"] <= 0) {
                  return setFormInputError({
                        field: "maxTrainees",
                        error: true,
                  });
            }
            if (!formData["timeSlotId"]) {
                  return setFormInputError({
                        field: "timeSlotId",
                        error: true,
                  });
            }
            if (formData["trainers"].length <= 1) {
                  return setFormInputError({
                        field: "timeSlotId",
                        error: true,
                  });
            }

            setFormInputError(null);

            formData["maxTrainees"] = Number(formData["maxTrainees"]);
            try {
                  const res = await createClassSchedule(formData).unwrap();

                  if (res) {
                        toast({
                              title: "✅ Successfully created",
                        });

                        setFormData({ ...initialLoginData });
                        setTrainers([]);
                  }

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                  toast({
                        title: `❌ ${error?.data?.message}`,
                  })
            }
      };

      const daysOptions = daysOfWeek.map((day, index) => ({
            id: index + day,
            value: day,
            label: <span className='Capitalize'>{day}</span>
      }));

      const timeSlotOptions = timeSlots.map(timeSlot => ({
            id: timeSlot._id,
            value: timeSlot?._id,
            label: `${timeSlot.startingTime} - ${timeSlot.endingTime}`
      }));

      const userOptions = users.map(user => ({
            id: user._id,
            value: user?._id,
            label: user?.name
      }));

      const handleToggleItem = (value: string) => {
            setTrainers((prev) =>
                  prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
            );
      }

      return (
            <div>
                  <h2 className='text-xl'>Create Schedule</h2>
                  <Separator className='mb-3' />

                  <form
                        className="flex flex-col gap-3 md:gap-7 mt-5 md:mt-10 max-w-min border p-5"
                        onSubmit={handleSubmit}
                  >
                        <div>
                              <Label className="text-lg">Title:</Label>
                              <Input
                                    type="text"
                                    name="title"
                                    value={formData["title"]}
                                    placeholder="Enter a unique title"
                                    className="w-[300px]"
                                    onChange={handleOnchange}
                                    required
                              />
                              {formError &&
                                    formError["field"] === "title" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Title is required</p>
                                    )}
                        </div>
                        <div>
                              <Label className="text-lg">Maximum Trainees:</Label>
                              <Input
                                    type="number"
                                    name="maxTrainees"
                                    value={formData["maxTrainees"]}
                                    placeholder="Enter the maximum trainees you allow"
                                    className="w-[300px]"
                                    onChange={handleOnchange}
                                    required
                              />
                              {formError &&
                                    formError["field"] === "maxTrainees" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Trainees must be at least 1</p>
                                    )}
                        </div>
                        <div>
                              <Label className="text-lg">Day:</Label>
                              <SelectInput
                                    options={daysOptions}
                                    placeholder='Select Day'
                                    onChange={handleSelect}
                                    name='day'
                              />
                              {formError &&
                                    formError["field"] === "day" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Day is required</p>
                                    )}
                        </div>
                        <div>
                              <Label className="text-lg">Time Slot:</Label>
                              <SelectInput
                                    options={timeSlotOptions}
                                    placeholder='Select Time Slot'
                                    onChange={handleSelect}
                                    name='timeSlotId'
                              />
                              {formError &&
                                    formError["field"] === "timeSlotId" &&
                                    formError["error"] && (
                                          <p className="text-red-400">Time Slot is required</p>
                                    )}
                        </div>
                        <div>
                              <Label className="text-lg">Trainers:</Label>
                              <Select>
                                    <SelectTrigger>
                                          <SelectValue placeholder="Select Trainer" />
                                    </SelectTrigger>
                                    <SelectContent className="p-2">
                                          <SelectGroup>
                                                <SelectLabel>Trainers</SelectLabel>
                                                {userOptions.map((trainer) => (
                                                      <div key={trainer.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                  checked={trainers.includes(trainer.value)}
                                                                  onCheckedChange={() => handleToggleItem(trainer.value)}
                                                            />
                                                            <span>{trainer.label}</span>
                                                      </div>
                                                ))}
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              {formError &&
                                    formError["field"] === "trainers" &&
                                    formError["error"] && (
                                          <p className="text-red-400">At least one trainer must be select</p>
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
                                                Please wait
                                          </>
                                    ) : (
                                          "Submit"
                                    )}
                              </Button>
                        </div>
                  </form>
            </div>
      );
};

export default CreateSchedule;