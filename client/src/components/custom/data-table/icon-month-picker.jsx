"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addYears, subYears } from "date-fns";
import { cn } from "@/lib/utils";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateYearRange = (currentYear, range = 11) => {
  const startYear = currentYear - Math.floor(range / 2);
  return Array.from({ length: range }, (_, i) => startYear + i);
};

export default function IconMonthPickerComponent({ onMonthChange }) {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isYearView, setIsYearView] = useState(false);
  const [yearRange, setYearRange] = useState(
    generateYearRange(new Date().getFullYear())
  );

  useEffect(() => {
    if (onMonthChange && typeof onMonthChange === "function") {
      onMonthChange(date);
    }
  }, [date, onMonthChange]);

  const handleMonthSelect = (month) => {
    const newDate = new Date(date.getFullYear(), months.indexOf(month));
    setDate(newDate);
    setIsOpen(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(year, date.getMonth());
    setDate(newDate);
    setIsYearView(false);
  };

  const changeYear = (amount) => {
    const newDate =
      amount > 0 ? addYears(date, amount) : subYears(date, Math.abs(amount));
    setDate(newDate);
    setYearRange(generateYearRange(newDate.getFullYear()));
  };

  const toggleView = () => {
    setIsYearView(!isYearView);
    if (!isYearView) {
      setYearRange(generateYearRange(date.getFullYear()));
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("shrink-0", isOpen && "text-primary")}
          aria-label={`Select month, currently ${format(date, "MMMM yyyy")}`}
        >
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="flex items-center justify-between p-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeYear(-1)}
            aria-label="Previous year"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={toggleView}
            aria-label={isYearView ? "Show months" : "Show years"}
          >
            {isYearView
              ? `${yearRange[0]} - ${yearRange[yearRange.length - 1]}`
              : date.getFullYear()}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeYear(1)}
            aria-label="Next year"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2">
          {isYearView
            ? yearRange.map((year) => (
                <Button
                  key={year}
                  variant="ghost"
                  className={cn(
                    "h-9 w-full",
                    year === date.getFullYear() &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleYearSelect(year)}
                  aria-label={`Select year ${year}`}
                  aria-selected={year === date.getFullYear()}
                >
                  {year}
                </Button>
              ))
            : months.map((month) => (
                <Button
                  key={month}
                  variant="ghost"
                  className={cn(
                    "h-9 w-full",
                    month === format(date, "MMMM") &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleMonthSelect(month)}
                  aria-label={`Select ${month}`}
                  aria-selected={month === format(date, "MMMM")}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
