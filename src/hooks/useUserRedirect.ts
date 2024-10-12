"use client";

import { USER_ROLE } from "@/constants/userRole";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useUserRedirect = (pathname?: string | null) => {
  const userInfo = useAppSelector((state) => state.auth);
  const router = useRouter();

  //   console.log("pathname ", pathname);

  useEffect(() => {
    if (userInfo?.accessToken && userInfo?.user) {
      if (
        userInfo?.user?.role === USER_ROLE.admin &&
        !pathname?.startsWith("/dashboard/admin")
      ) {
        router.push("/dashboard/admin");
      } else if (
        userInfo?.user?.role === USER_ROLE.trainer &&
        !pathname?.startsWith("/dashboard/trainer")
      ) {
        router.push("/dashboard/trainer");
      } else if (
        userInfo?.user?.role === USER_ROLE.trainee &&
        !pathname?.startsWith("/dashboard/trainee")
      ) {
        router.push("/dashboard/trainee");
      }
    } else {
      router.push("/login");
    }
  }, [userInfo?.accessToken, router, userInfo?.user, pathname]);
};

export default useUserRedirect;
