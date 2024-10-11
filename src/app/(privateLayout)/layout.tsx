import DLayout from "@/components/Dashboard/DLayout";
import React, { ReactNode } from "react";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DLayout>{children}</DLayout>
    </div>
  );
};

export default PrivateLayout;
