import Image from "next/image";
import LoginBg from "./../../assets/login-bg.png";
import Logo from "./../../assets/logo.svg"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"

const LoginPage = () => {
      return (
            <div
                  style={{
                        backgroundImage: `url(${LoginBg.src})`
                  }}
                  className="min-h-[100vh] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
            >
                  <div className="w-[98%] sm:w-[70%] md:w-[50%] xl:w-[30%] mx-auto bg-black/80 backdrop-blur-sm p-10 md:p-20">
                        <div className="flex flex-col items-center justify-center">
                              <Link href={"/"}>
                                    <Image src={Logo} alt="brand logo" />
                              </Link>
                              <Separator className="my-5"/>
                              <h2 className="text-white text-3xl uppercase font-bold">Login here</h2>
                        </div>

                        <form className="flex flex-col gap-4 md:gap-7 mt-5 md:mt-10">
                              <Input
                                    type="email"
                                    placeholder="Email"
                                    className="text-base md:text-lg py-5 md:py-7 px-3 md:px-5 rounded-none bg-white border-none " required
                              />
                              <Input
                                    type="password"
                                    placeholder="Password"
                                    className="text-base md:text-lg py-5 md:py-7 px-3 md:px-5 rounded-none bg-white border-none " required
                              />
                              <p 
                              className="text-white"
                              >
                                    Don&apos;t have account? {" "}
                                    <Link 
                                    href={"/register"}
                                    className="text-blue-400 underline"
                                    >Sign Up</Link>
                                    </p>

                              <div className="text-center">
                                    <Button
                                          className="text-lg uppercase bg-red-700 hover:bg-red-900 py-7 px-7 rounded-none"
                                    >
                                          Login
                                    </Button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default LoginPage;