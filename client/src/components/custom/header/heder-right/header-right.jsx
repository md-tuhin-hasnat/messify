"use client";
import { usePathname } from "next/navigation";
import AddButtonComponent from "./add-button";
import AvatarMenu from "./avatar-menu";
import NotificationBellComponent from "./notification/components-notification-bell";
import NotificationBell from "./notification/components-notification-bell";

export default function HeaderRight() {
  const pathName = usePathname();

  if (pathName === "/auth") {
    return <></>;
  }

  return (
    <div className="my-auto flex gap-4">
      <AddButtonComponent />
      <NotificationBell />
      <AvatarMenu />
    </div>
  );
}
