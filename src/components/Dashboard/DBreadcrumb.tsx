import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";

export function DBreadcrumb({ pathname }: { pathname: string }) {
  const paths: string[] = [];
  const breadcrumbItems = pathname
    .split("/")
    .slice(1)
    .map((item) => {
      paths.push(`/${item}`);
      return {
        key: paths.join().replace(",", ""),
        label: item,
        href: paths.join().replace(",", ""),
      };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.length > 0 &&
          breadcrumbItems?.map((item, index, items) => {
            return (
              <React.Fragment key={item?.key}>
                <BreadcrumbItem>
                  {items.length - 1 !== index ? (
                    //   <BreadcrumbLink className="capitalize" href={item?.href}>{item?.label}</BreadcrumbLink>
                    <Link
                      className="capitalize flex items-center gap-1"
                      href={item?.href}
                    >
                      {index === 0 && <IoHomeOutline />}
                      {item?.label}
                    </Link>
                  ) : (
                    <BreadcrumbPage className="capitalize flex items-center gap-1">
                      {items.length === 1 && <IoHomeOutline />}
                      {item?.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {/* separator should not visible after the last item */}
                {items.length - 1 !== index && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
