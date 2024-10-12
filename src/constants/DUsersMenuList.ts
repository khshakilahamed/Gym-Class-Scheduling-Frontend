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
          href: "/dashboard/trainee/bookings",
          label: "Create Booking",
          active: pathname.includes("/dashboard/trainee/bookings"),
          icon: Plus,
          submenus: [],
        },
      ],
    },
  ];
};
