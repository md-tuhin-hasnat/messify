"use client";

import { useContext, useEffect, useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaCircleCheck } from "react-icons/fa6";
import { AllMessContext, MessContext, RenderContext } from "@/app/providers";
import getMesses from "@/app/actions/get_messes.action";
export default function MobileSelectMess() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { setMessValue } = useContext(MessContext);
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
  const SelectContent = () => (
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
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="py-2 hover:bg-accent rounded flex justify-center my-auto">
          <FaCircleCheck className="mx-0 my-auto h-6 w-6" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select Mess</DrawerTitle>
          <DrawerDescription>
            Choose your mess from the list below
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <SelectContent />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
