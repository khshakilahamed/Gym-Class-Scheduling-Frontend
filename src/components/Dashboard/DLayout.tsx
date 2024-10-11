import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import DSidebar from "./DSidebar";

const DLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DSidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 ml-0 lg:ml-72" /* ,
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72" */
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300 ml-0 lg:ml-72" /* ,
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72" */
        )}
      >
        <p className="text-center py-6">Footer</p>
      </footer>
    </div>
  );
};

export default DLayout;
