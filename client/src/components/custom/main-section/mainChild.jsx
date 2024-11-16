import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainChild({ child }) {
  return (
    <section>
      <ScrollArea className="h-mavh md:h-navh">{child}</ScrollArea>
    </section>
  );
}
