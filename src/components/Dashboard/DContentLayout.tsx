import { usePathname } from "next/navigation";
import { DNavbar } from "./DNavbar";
import { DBreadcrumb } from "./DBreadcrumb";

interface DContentLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const DContentLayout = ({
  title = "Dashboard",
  children,
}: DContentLayoutProps) => {
  const pathname = usePathname();
  return (
    <div>
      <DNavbar title={title} />

      <div className="container pt-8 pb-8 px-4 sm:px-8">
        <DBreadcrumb pathname={pathname} />
        {children}
      </div>
    </div>
  );
};

export default DContentLayout;
