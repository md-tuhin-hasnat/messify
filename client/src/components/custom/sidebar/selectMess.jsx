"use client";

// import * as React from "react";
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
  const [value, setValue] = useState("");
  const { setMessValue, messValue } = useContext(MessContext);
  const { setMessList, messList } = useContext(AllMessContext);
  const { setIsRendered, isRendered } = useContext(RenderContext);
  useEffect(() => {
    if (!isRendered) {
      getMesses()
        .then((messes) => {
          setMessList([]);
          messes.allMessOfUser.map((mess) => {
            const newMess = {
              label: mess.name,
              value: mess.code,
            };
            setMessList((prev) => {
              return [...prev, newMess];
            });
          });
          setIsRendered(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    if (value != "") localStorage.setItem("MessCode", messValue);
    else localStorage.setItem("MessCode", "NUN");
  }, [value]);
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
                    setMessValue(mess.value);
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
