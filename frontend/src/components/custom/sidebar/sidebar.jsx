import { Separator } from "@/components/ui/separator";
import NavLinks from "./navLinks/navLinks";
import SelectMess from "./selectMess";

export default function Sidebar() {
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
}
