"use client";
// import { DBreadcrumb } from "@/components/Dashboard/DBreadcrumb";
import DContentLayout from "@/components/Dashboard/DContentLayout";
import { Card, CardContent } from "@/components/ui/card";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <DContentLayout>
      <Card className="min-h-[70vh] w-full rounded-lg border-none mt-6">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </DContentLayout>
  );
};

export default layout;
