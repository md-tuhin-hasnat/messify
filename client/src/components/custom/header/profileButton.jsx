"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
export default function ProfileButton() {
  const pathname = usePathname();
  if (pathname !== "/") {
    return <></>;
  } else {
    return (
      <button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>
    );
  }
}
