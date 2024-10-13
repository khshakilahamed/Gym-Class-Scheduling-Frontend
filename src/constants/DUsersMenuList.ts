import { LayoutGrid, Plus, BarChart } from "lucide-react";

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
