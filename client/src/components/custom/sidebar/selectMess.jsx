"use client";

import { useContext, useEffect, useState } from "react";
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
import { AllMessContext, MessContext, RenderContext } from "@/app/providers";
import getMesses from "@/app/actions/get_messes.action";

export default function SelectMess() {
  const [open, setOpen] = useState(false);
  const { messValue, setMessValue } = useContext(MessContext);
  const { setMessList, messList } = useContext(AllMessContext);
  const { setIsRendered, isRendered } = useContext(RenderContext);

  useEffect(() => {
    if (!isRendered) {
      getMesses()
        .then((messes) => {
          const messesData = messes.allMessOfUser.map((mess) => ({
            label: mess.name,
            value: mess.code,
          }));
          setMessList(messesData);
          setIsRendered(true);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[234px] ml-[8px] justify-between"
        >
          {messValue !== "" && messValue !== "NUN"
            ? messList.find((mess) => mess.value === messValue)?.label
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
                    setMessValue(
                      currentValue === messValue ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {mess.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      messValue === mess.value ? "opacity-100" : "opacity-0"
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
