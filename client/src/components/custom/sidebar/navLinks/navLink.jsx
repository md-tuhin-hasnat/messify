"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLink({ address, linkName, icon }) {
  const Icon = icon;
  const pathName = usePathname();
  return (
    <li
      className={`py-2 rounded ${
        pathName === address
          ? "bg-primary hover:bg-primary/90"
          : "hover:bg-accent"
      }`}
    >
      <Link href={address} className="pl-3 flex gap-4 mx-0 my-auto">
        <Icon
          className={`mx-0 my-auto ${
            pathName === address ? "text-primary-foreground" : ""
          }`}
        />
        <span
          className={`mx-0 my-auto text-sm ${
            pathName === address ? "text-primary-foreground" : ""
          }`}
        >
          {linkName}
        </span>
      </Link>
    </li>
  );
}
