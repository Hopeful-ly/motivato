"use client";
import { usePathname } from "next/navigation";
import { BreadcrumbPage } from "../ui/breadcrumb";

export default function NavCrumb() {
  const pathname = usePathname();

  return (
    <BreadcrumbPage>
      {pathname
        .split("/")
        .pop()
        ?.split("-")
        .map((v) => v.at(0)?.toUpperCase() + v.slice(1))
        .join(" ") || "Home"}
    </BreadcrumbPage>
  );
}
