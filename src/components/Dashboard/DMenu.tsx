"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePathname } from "next/navigation";
import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DCollapseMenuButton } from "./DCollapseMenuButton";
import { getDMenuList } from "@/constants/DMenuList";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userLoggedOut } from "@/redux/slices/authSlice";

const DMenu = () => {
  const userInfo = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const menuList = getDMenuList(pathname, userInfo.user.role);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(
      userLoggedOut({
        accessToken: "",
        user: {
          userId: "",
          name: "",
          email: "",
          role: "",
        },
      })
    );
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-130px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {groupLabel && (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              )}
              {menus.map(({ href, label, icon: Icon, active, submenus }, i) =>
                submenus?.length === 0 ? (
                  <div className="w-full" key={i}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? "secondary" : "ghost"}
                            className="w-full justify-start h-10 mb-1"
                            asChild
                          >
                            <Link href={href}>
                              <span className={cn("mr-4")}>
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[200px] truncate  translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {/* {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )} */}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <DCollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                    />
                  </div>
                )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn("mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p className={cn("whitespace-nowrap opacity-100")}>
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {/* {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )} */}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default DMenu;
