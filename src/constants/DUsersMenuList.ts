import { StackIcon } from "@radix-ui/react-icons";
import { LayoutGrid, Plus, BarChart, Timer, User, User2, UserCircle } from "lucide-react";

export const traineeMenuList = (pathname: string) => {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/trainee/profile",
          label: "Profile",
          active: pathname.includes("/dashboard/trainee/profile"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Bookings",
      menus: [
        {
          href: "/dashboard/trainee/bookings",
          label: "My Bookings",
          active: pathname.includes("/dashboard/trainee/bookings"),
          icon: BarChart,
          submenus: [],
        },
        {
          href: "/dashboard/trainee/create-booking",
          label: "Create Booking",
          active: pathname.includes("/dashboard/trainee/create-booking"),
          icon: Plus,
          submenus: [],
        },
      ],
    },
  ];
};

export const trainerMenuList = (pathname: string) => {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/trainer/profile",
          label: "Profile",
          active: pathname.includes("/dashboard/trainer/profile"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Schedule",
      menus: [
        {
          href: "/dashboard/trainer/schedule",
          label: "My Schedules",
          active: pathname.includes("/dashboard/trainee/schedule"),
          icon: BarChart,
          submenus: [],
        },
      ],
    },
  ];
};

export const adminMenuList = (pathname: string) => {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/admin/profile",
          label: "My Profile",
          active: pathname.includes("/dashboard/admin/profile"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Schedule",
      menus: [
        {
          href: "/dashboard/admin/schedule",
          label: "Schedules",
          active: pathname.includes("/dashboard/admin/schedule"),
          icon: BarChart,
          submenus: [],
        },
        {
          href: "/dashboard/admin/create-schedule",
          label: "Create Schedules",
          active: pathname.includes("/dashboard/admin/create-schedule"),
          icon: Plus,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Time Slot",
      menus: [
        {
          href: "/dashboard/admin/timeslot",
          label: "Time Slots",
          active: pathname.includes("/dashboard/admin/timeslot"),
          icon: Timer,
          submenus: [],
        },
        {
          href: "/dashboard/admin/create-timeslot",
          label: "Create Time Slot",
          active: pathname.includes("/dashboard/admin/create-timeslot"),
          icon: Plus,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Users",
      menus: [
        {
          href: "/dashboard/admin/all-users",
          label: "All Users",
          active: pathname.includes("/dashboard/admin/all-users"),
          icon: User,
          submenus: [],
        },
        {
          href: "/dashboard/admin/trainers",
          label: "Trainers",
          active: pathname.includes("/dashboard/admin/trainers"),
          icon: UserCircle,
          submenus: [],
        },
        {
          href: "/dashboard/admin/create-user",
          label: "Create Trainer",
          active: pathname.includes("/dashboard/admin/create-trainer"),
          icon: Plus,
          submenus: [],
        },
        {
          href: "/dashboard/admin/trainees",
          label: "Trainees",
          active: pathname.includes("/dashboard/admin/trainees"),
          icon: User2,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Bookings",
      menus: [
        {
          href: "/dashboard/admin/all-bookings",
          label: "All Bookings",
          active: pathname.includes("/dashboard/admin/all-Bookings"),
          icon: StackIcon,
          submenus: [],
        },
      ],
    },
  ];
};
