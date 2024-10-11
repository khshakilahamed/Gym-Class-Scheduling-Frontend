import { DNavbar } from "./DNavbar";

interface DContentLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const DContentLayout = ({
  title = "Dashboard",
  children,
}: DContentLayoutProps) => {
  return (
    <div>
      <DNavbar title={title} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
};

export default DContentLayout;
