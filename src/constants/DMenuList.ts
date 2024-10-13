import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";
import { USER_ROLE } from "./userRole";
import { traineeMenuList, trainerMenuList } from "./DUsersMenuList";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getDMenuList(
  pathname: string,
  userRole: string | undefined
): Group[] {
  let menuList: Group[] = [];

  switch (userRole) {
    case USER_ROLE.trainee:
      menuList = traineeMenuList(pathname);
      break;
    case USER_ROLE.trainer:
      menuList = trainerMenuList(pathname);
      break;
  }

  return menuList;
}
