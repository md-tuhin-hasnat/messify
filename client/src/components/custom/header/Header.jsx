import ThemeSwitch from "./themeswitcher/themeSwitch";
import { Separator } from "@/components/ui/separator";
import AvatarMenu from "./avatar-menu";
import Link from "next/link";
import { NotificationBellComponent } from "./notification-bell";
export default function Header() {
  return (
    <>
      <header className="flex justify-between px-5 h-12">
        <div className="my-auto flex gap-4">
          < Link href={'/'}>
          <h1 className="text-foreground text-xl">MessMaster</h1>
          </Link>
          <ThemeSwitch />
        </div>
        <div className="my-auto flex gap-4">
          <NotificationBellComponent />
          <AvatarMenu />
        </div>
      </header>
      <Separator />
    </>
  );
}
