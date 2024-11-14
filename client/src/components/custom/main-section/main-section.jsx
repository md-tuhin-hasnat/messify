import dynamic from "next/dynamic";
import Sidebar from "../sidebar/sidebar";
import Loading from "../loader/loading";
import { ScrollArea } from "@/components/ui/scroll-area";

const MainChild = dynamic(() => import("./mainChild"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function MainSection({ child }) {
  return (
    <main className="flex flex-col h-mavh md:h-navh md:flex-row-reverse">
      <section className="flex-1">
        <MainChild child={child} />
      </section>
      <section className="h-12">
        <Sidebar />
      </section>
    </main>
  );
}
