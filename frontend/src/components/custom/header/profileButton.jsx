"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export default function ProfileButton() {
  return (
    <button>
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </button>
  );
}
