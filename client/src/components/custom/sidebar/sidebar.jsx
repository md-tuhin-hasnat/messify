"use client";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import SelectMess from "./selectMess";
import NavLinks from "./navLinks/navLinks";
import MobileNavLinks from "./mobile-navLinks/mobile-navLinks";

const desktopSidebar = () => {
  return (
    <nav className="h-navh flex flex-row">
      <section>
        <div className="my-2 flex w-[250]">
          <SelectMess />
        </div>
        <NavLinks />
      </section>
      <Separator orientation="vertical" />
    </nav>
  );
};
const mobileSidebar = () => {
  return (
    <nav className="flex flex-col">
      <Separator orientation="horizontal" />
      <section>
        <MobileNavLinks />
      </section>
    </nav>
  );
};

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return desktopSidebar();
  } else {
    return mobileSidebar();
  }
}
