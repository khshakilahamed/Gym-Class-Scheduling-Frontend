"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import brandLogo from "./../../assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import DMenu from "./DMenu";

const DSheetMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // screen: lg = 1024
      //   if (window.innerWidth < 1024) {
      setIsOpen(false);
      //   }
    };
    window.addEventListener("resize", handleResize);
    // Close the Sheet on initial load if screen is less than lg
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          className="lg:hidden flex items-center justify-center"
          asChild
        >
          <MenuIcon onClick={() => setIsOpen(true)} size={20} />
        </SheetTrigger>
        <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
          <SheetHeader>
            <Button
              className={cn(
                "transition-transform ease-in-out duration-300 mb-1 bg-black"
              )}
              variant="link"
              asChild
            >
              <Link href="/dashboard" className="flex items-center">
                <Image
                  src={brandLogo}
                  //   width={143}
                  //   height={39}
                  className="max-w-[143px] max-h-[39px]"
                  alt="NEC Travels Logo"
                />
              </Link>
            </Button>
          </SheetHeader>
          <div className="overflow-y-auto">
            <DMenu />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DSheetMenu;
