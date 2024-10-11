import Image from "next/image";
import LoginBg from "./../../assets/login-bg.png";
import Logo from "./../../assets/logo.svg"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"

const RegisterPage = () => {
      return (
            <div
                  style={{
                        backgroundImage: `url(${LoginBg.src})`
                  }}
                  className="min-h-[100vh] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
            >
                  <div className="w-[98%] sm:w-[70%] md:w-[50%] xl:w-[30%] mx-auto bg-black/80 backdrop-blur-sm p-20">
                        <div className="flex flex-col items-center justify-center">
                              <Link href={"/"}>
                                    <Image src={Logo} alt="brand logo" />
                              </Link>
                              <Separator className="my-5"/>
                              <h2 className="text-white text-3xl uppercase font-bold">Sign up here</h2>
                        </div>

                        <form className="flex flex-col gap-7 mt-10">
                              <Input
                                    type="text"
                                    placeholder="Full Name"
                                    className="text-lg py-7 px-5 rounded-none bg-white border-none " required
                              />
                              <Input
                                    type="email"
                                    placeholder="Email"
                                    className="text-lg py-7 px-5 rounded-none bg-white border-none " required
                              />
                              <Input
                                    type="password"
                                    placeholder="Password"
                                    className="text-lg py-7 px-5 rounded-none bg-white border-none " required
                              />
                              <p 
                              className="text-white"
                              >
                                    Already have an account? {" "}
                                    <Link 
                                    href={"/login"}
                                    className="text-blue-400 underline"
                                    >Login</Link>
                                    </p>

                              <div className="text-center">
                                    <Button
                                          className="text-lg uppercase bg-red-700 hover:bg-red-900 py-7 px-7 rounded-none"
                                    >
                                          Sign Up
                                    </Button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default RegisterPage;