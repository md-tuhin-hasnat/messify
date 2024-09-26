import ThemeSwitch from "../themeswitcher/themeSwitch";
import { Separator } from "@/components/ui/separator";
import ProfileButton from "./profileButton";
export default function Navbar() {
  return (
    <>
      <header className="flex justify-between px-5 h-12">
        <div className="my-auto flex gap-4">
          <h1 className="text-foreground text-xl">MessMaster</h1>
          <ThemeSwitch />
        </div>
        <ProfileButton />
      </header>
      <Separator />
    </>
  );
}
