"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessRegistrationDialogComponent from "./mess-registration-dialog";
import JoinMessDialogComponent from "./join-mess";

export default function AddButtonComponent() {
  const handleJoinMess = () => {
    // Implement join mess functionality
    console.log("Join a mess clicked");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0 border-border">
        <div className="bg-background text-foreground">
          <ul className="py-1">
            <li>
              <JoinMessDialogComponent />
            </li>
            <li>
              <MessRegistrationDialogComponent />
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
