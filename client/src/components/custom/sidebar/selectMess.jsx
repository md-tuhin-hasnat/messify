"use client";

// import * as React from "react";
import { useEffect, useState } from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { backendURL } from "@/lib/secret";

var messList = [
  {
    value: "brotherzone",
    label: "Brother Zone",
  },
  {
    value: "bubtian",
    label: "BUBT-ian",
  },
];

export default function SelectMess() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`${backendURL}/api/mess/get`, {
    //       credentials: "include",
    //     });
    //     if (response.ok) {
    //       const messdata = await response.json();
    //       //TODO: Mess data adding using setstate
    //     } else {
    //       console.error("Error fetching user data:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching mess data:", error);
    //   }
    // };
    // fetchData();
  }, [""]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[234px] ml-[8px] justify-between"
        >
          {value
            ? messList.find((mess) => mess.value === value)?.label
            : "Select mess..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[234px] p-0">
        <Command>
          <CommandInput placeholder="Search mess..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Mess found.</CommandEmpty>
            <CommandGroup>
              {messList.map((mess) => (
                <CommandItem
                  key={mess.value}
                  value={mess.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {mess.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === mess.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
