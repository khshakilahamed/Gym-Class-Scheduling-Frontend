import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "./../../assets/logo.svg";
import DMenu from "./DMenu";
import { usePathname } from "next/navigation";
import useUserRedirect from "@/hooks/useUserRedirect";

const DSidebar = () => {
  const pathname = usePathname();

  /* Redirect According to user role */
  useUserRedirect(pathname);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 w-[90px] lg:w-72" /* ,
        sidebar?.isOpen === false ? "w-[90px]" : "w-72" */
      )}
    >
      {/* <h3>Dashboard</h3> */}
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1" /* ,
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0" */
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center py-5 bg-black">
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            <Image
              src={brandLogo}
              width={143}
              height={39}
              alt="NEC Travels Logo"
            />
          </Link>
        </Button>
        {/* Menus */}
        <DMenu />
      </div>
    </aside>
  );
};

export default DSidebar;
