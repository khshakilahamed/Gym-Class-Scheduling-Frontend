"use client";

import Image from "next/image";
import LoginBg from "./../../assets/login-bg.png";
import Logo from "./../../assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { storeUserInfo } from "@/services/auth.service";
import { useUserRegisterMutation } from "@/redux/api/authApi";
import { ApiError } from "@/types/global";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const initialRegistrationData = {
  email: "",
  password: "",
  name: "",
};

type FormInputErrorType = {
  field: string;
  error: boolean;
} | null;

const RegisterPage = () => {
  const [formData, setFormData] = useState({ ...initialRegistrationData });
  const [formError, setFormInputError] = useState<FormInputErrorType>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const {toast} = useToast();

  const [userRegister, { error: loginError, isLoading }] =
    useUserRegisterMutation();

  const errorMessage = (loginError as ApiError)?.data?.message;

  // Use useEffect to update the error state when errorMessage changes
  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [errorMessage]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
    if (!formData["password"]) {
      return setFormInputError({
        field: "password",
        error: true,
      });
    }

    setFormInputError(null);

    // console.log(formData);

    try {
      const res = await userRegister(formData).unwrap();

      // console.log(res);

      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        setFormData({ ...initialRegistrationData });
        toast({
          title: `✅ Successfully Registered`,
        })
        router.push("/dashboard");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.data?.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${LoginBg.src})`,
      }}
      className="min-h-[100vh] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
    >
      <div className="w-[98%] sm:w-[70%] md:w-[50%] xl:w-[30%] mx-auto bg-black/80 backdrop-blur-sm p-10 md:p-20">
        <div className="flex flex-col items-center justify-center">
          <Link href={"/"}>
            <Image src={Logo} alt="brand logo" />
          </Link>
          <Separator className="my-5" />
          <h2 className="text-white text-3xl uppercase font-bold">
            Sign up here
          </h2>
        </div>

        <form
          className="flex flex-col gap-4 md:gap-7 mt-5 md:mt-10"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData["name"]}
              className="text-base md:text-lg py-5 md:py-7 px-3 md:px-5 rounded-none bg-white border-none "
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
            <Input
              type="email"
              name="email"
              value={formData["email"]}
              placeholder="Email"
              className="text-base md:text-lg py-5 md:py-7 px-3 md:px-5 rounded-none bg-white border-none "
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
            <Input
              type="password"
              name="password"
              value={formData["password"]}
              placeholder="Password"
              className="text-base md:text-lg py-5 md:py-7 px-3 md:px-5 rounded-none bg-white border-none "
              onChange={handleOnchange}
              required
            />
            {formError &&
              formError["field"] === "password" &&
              formError["error"] && (
                <p className="text-red-400">Email is required</p>
              )}
          </div>
          <p className="text-white">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-400 underline">
              Login
            </Link>
          </p>

          <div className="text-center">
            {error && <p className="text-red-400">{error}</p>}
            <Button
              className="text-lg uppercase bg-red-700 hover:bg-red-900 py-7 px-7 rounded-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
