"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { USER_ROLE } from "@/constants/userRole";
import { useToast } from "@/hooks/use-toast";
import { useMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hook";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type FormInputErrorType = {
      field: string;
      error: boolean;
} | null;

type IFormData = {
      email: string,
      name: string,
}

const initialFormData: IFormData = {
      email: "",
      name: "",
};

const Profile = () => {
      const [formData, setFormData] = useState<IFormData>({ ...initialFormData });
      const [isEdit, setIsEdit] = useState<boolean>(false);
      const [isInitial, setIsInitial] = useState<boolean>(true);
      const [isBtnActive, setIsBtnActive] = useState<boolean>(true);
      const [formError, setFormInputError] = useState<FormInputErrorType>(null);
      const { toast } = useToast();
      const { user } = useAppSelector(state => state.auth);

      const { data, isLoading: isDataLoading } = useMyProfileQuery(null);
      const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();

      useEffect(() => {
            if (data && isInitial) {
                  setFormData({
                        ...formData,
                        email: data?.email,
                        name: data?.name
                  })
                  setIsInitial(false)
            }
      }, [data, formData, isInitial]);

      useEffect(() => {
            if (formData?.email !== data?.email || formData?.name !== data?.name) {
                  setIsBtnActive(false)
            } else {
                  setIsBtnActive(true);
            }
      }, [data?.email, data?.name, formData?.email, formData?.name]);

      const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // console.log(e.target.name, e.target.value);
            setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
            }));
      };

      // console.log(data);

      //   submit handler
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (data?.role === USER_ROLE.trainer || user?.role === USER_ROLE?.trainer) {
                  toast({
                        title: `❌ You can not edit the profile`,
                  })
            }

            if (!formData["email"]) {
                  return setFormInputError({
                        field: "email",
                        error: true,
                  });
            }
            if (!formData["name"]) {
                  return setFormInputError({
                        field: "name",
                        error: true,
                  });
            }

            setFormInputError(null);

            try {
                  const res = await updateMyProfile(formData).unwrap();
                  console.log(res);

                  if (res) {
                        toast({
                              title: "✅ Successfully updated",
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
                  <h2>My Profile</h2>
                  <Separator />

                  <div className="my-10 w-[300px]">
                        {
                              !isEdit ?
                                    <>
                                          {
                                                !isDataLoading ?
                                                      <div className="flex flex-col gap-3">
                                                            <div>
                                                                  <Label className="text-lg">Name:</Label>
                                                                  <Input value={data?.name} disabled className="font-bold" />
                                                            </div>
                                                            <div>
                                                                  <Label className="text-lg">Email:</Label>
                                                                  <Input value={data?.email} disabled className="font-bold" />
                                                            </div>
                                                            <div>
                                                                  <Label className="text-lg">Role:</Label>
                                                                  <Input value={data?.role} disabled className="font-bold" />
                                                            </div>
                                                            <div>
                                                                  <Button
                                                                        className="bg-green-600"
                                                                        onClick={() => setIsEdit(true)}
                                                                        disabled={user?.role === USER_ROLE.trainer}
                                                                  >
                                                                        Edit
                                                                  </Button>
                                                            </div>
                                                      </div>
                                                      :
                                                      <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                      </>
                                          }
                                    </>
                                    :
                                    <div>
                                          <form
                                                className="flex flex-col gap-3"
                                                onSubmit={handleSubmit}
                                          >
                                                <div>
                                                      <Label className="text-lg">Name:</Label>
                                                      <Input
                                                            name="name"
                                                            value={formData?.name}
                                                            onChange={handleOnchange}
                                                            className="font-bold"
                                                            required
                                                      />
                                                      {formError &&
                                                            formError["field"] === "name" &&
                                                            formError["error"] && (
                                                                  <p className="text-red-400">Email is required</p>
                                                            )}
                                                </div>
                                                <div>
                                                      <Label className="text-lg">Email:</Label>
                                                      <Input
                                                            name="email"
                                                            value={formData?.email}
                                                            onChange={handleOnchange}
                                                            className="font-bold"
                                                            required
                                                      />
                                                      {formError &&
                                                            formError["field"] === "email" &&
                                                            formError["error"] && (
                                                                  <p className="text-red-400">Email is required</p>
                                                            )}
                                                </div>
                                                <div className="space-x-2">
                                                      <Button
                                                            className="bg-white text-black hover:text-white"
                                                            onClick={() => setIsEdit(false)}
                                                      >
                                                            Cancel
                                                      </Button>
                                                      <Button
                                                            className="bg-green-600"
                                                            disabled={isBtnActive || isLoading}
                                                      >
                                                            {
                                                                  isLoading ? "Updating..." : "Update"
                                                            }
                                                      </Button>
                                                </div>
                                          </form>
                                    </div>
                        }
                  </div>
            </div>
      );
};

export default Profile;