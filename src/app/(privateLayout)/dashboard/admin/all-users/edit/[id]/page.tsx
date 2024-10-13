"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { USER_ROLE } from '@/constants/userRole';
import { useToast } from '@/hooks/use-toast';
import { useCreateTrainerMutation, useUpdateUserMutation, useUserQuery } from '@/redux/api/userApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type FormInputErrorType = {
      field: string;
      error: boolean;
} | null;

type IFormData = {
      name: string,
      email: string
}

const EditUser = ({ params }: { params: any }) => {
      const { id } = params;
      const initialFormData: IFormData = {
            name: "",
            email: ""
      };
      const [formData, setFormData] = useState({ ...initialFormData });
      const [formError, setFormInputError] = useState<FormInputErrorType>(null);
      const [isInitial, setIsInitial] = useState<boolean>(true);
      const { toast } = useToast();

      const { data } = useUserQuery(id);
      const [updateUser, { isLoading }] = useUpdateUserMutation();


      useEffect(() => {
            if (data && isInitial) {
                  setFormData({
                        name: data?.name,
                        email: data?.email,
                  });

                  setIsInitial(false)
            }
      }, [data, isInitial]);


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

            if (!formData["name"]) {
                  return setFormInputError({
                        field: "name",
                        error: true,
                  });
            }
            if (!formData["email"]) {
                  return setFormInputError({
                        field: "email",
                        error: true,
                  });
            }

            setFormInputError(null);

            const updatedData = {
                  formData,
                  id
            }

            try {
                  const res = await updateUser(updatedData).unwrap();

                  if (res) {
                        toast({
                              title: "✅ Successfully updated",
                        });

                        setIsInitial(true);
                        setFormData({ ...initialFormData });
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
                  <h2 className="text-xl">Create Trainer</h2>
                  <Separator className="mb-5" />

                  <div

                  >
                        <form
                              className="flex flex-col gap-3 md:gap-7 mt-5 md:mt-10 max-w-min border p-5"
                              onSubmit={handleSubmit}
                        >
                              <div>
                                    <Label className="text-lg">Full Name:</Label>
                                    <Input
                                          type="text"
                                          name="name"
                                          value={formData["name"]}
                                          placeholder="Enter your full name"
                                          className="w-[300px]"
                                          onChange={handleOnchange}
                                          required
                                    />
                                    {formError &&
                                          formError["field"] === "name" &&
                                          formError["error"] && (
                                                <p className="text-red-400">Name is required</p>
                                          )}
                              </div>
                              <div>
                                    <Label className="text-lg">Email:</Label>
                                    <Input
                                          type="email"
                                          name="email"
                                          value={formData["email"]}
                                          placeholder="Enter your full email"
                                          className="w-[300px]"
                                          onChange={handleOnchange}
                                          required
                                    />
                                    {formError &&
                                          formError["field"] === "email" &&
                                          formError["error"] && (
                                                <p className="text-red-400">Email is required</p>
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

            </div>
      );
};

export default EditUser;