"use client";

import DContentLayout from "@/components/Dashboard/DContentLayout";
import { Card, CardContent } from "@/components/ui/card";
import useUserRedirect from "@/hooks/useUserRedirect";

const Dashboard = () => {
  useUserRedirect();

  return (
    <DContentLayout>
      <Card className="min-h-[70vh] rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <h3></h3>
        </CardContent>
      </Card>
    </DContentLayout>
  );
};

export default Dashboard;
