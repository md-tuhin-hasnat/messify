import ThemeSwitch from "./themeswitcher/themeSwitch";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import HeaderRight from "./heder-right/header-right";
export default function Header() {
  return (
    <>
      <header className="flex justify-between px-5 h-12">
        <div className="my-auto flex gap-4">
          <Link href={"/"}>
            <h1 className="text-foreground text-xl">MessMaster</h1>
          </Link>
          <ThemeSwitch />
        </div>
        <div className="my-auto flex gap-4">
          <HeaderRight />
        </div>
      </header>
      <Separator />
    </>
  );
}
