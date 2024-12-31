"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FilterIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ExpenseCategorySelector } from "./expense-category-selector";
import { MonthYearSelector } from "./month-year-selector";

export default function FilterComponent({ onMonthChange, onCategoryChange}) {
  const [date, setDate] = useState(() => new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("All Expense");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    if (onMonthChange && typeof onMonthChange === "function") {
      onMonthChange(date);
    }
  }, [date, onMonthChange]);

  useEffect(() => {
    if (onCategoryChange && typeof onCategoryChange === "function") {
      onCategoryChange(category);
    }
  }, [category, onCategoryChange]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("shrink-0", isOpen && "bg-accent")}
        >
          <FilterIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="end">
        <div className="space-y-2 p-2">
          <Collapsible open={isMonthOpen} onOpenChange={setIsMonthOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span>
                  Month: {date ? format(date, "MMMM yyyy") : "Select a date"}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isMonthOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <MonthYearSelector
                date={date || new Date()}
                onDateChange={handleDateChange}
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span>Category: {category}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCategoryOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <ExpenseCategorySelector
                category={category}
                onCategorySelect={handleCategorySelect}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </PopoverContent>
    </Popover>
  );
}
