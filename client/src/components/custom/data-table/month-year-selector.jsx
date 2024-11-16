'use client';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addYears, subYears } from "date-fns"
import { cn } from "@/lib/utils"

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const generateYearRange = (currentYear, range = 11) => {
  const startYear = currentYear - Math.floor(range / 2)
  return Array.from({ length: range }, (_, i) => startYear + i);
}

export function MonthYearSelector({
  date = new Date(),
  onDateChange
}) {
  const [isYearView, setIsYearView] = useState(false)
  const [yearRange, setYearRange] = useState(generateYearRange(date?.getFullYear() || new Date().getFullYear()))

  const handleMonthSelect = (month) => {
    const newDate = new Date(date?.getFullYear() || new Date().getFullYear(), months.indexOf(month))
    onDateChange(newDate)
  }

  const handleYearSelect = (year) => {
    const newDate = new Date(year, date?.getMonth() || 0)
    onDateChange(newDate)
    setIsYearView(false)
  }

  const changeYear = (amount) => {
    const newDate = amount > 0 ? addYears(date || new Date(), amount) : subYears(date || new Date(), Math.abs(amount))
    onDateChange(newDate)
    setYearRange(generateYearRange(newDate.getFullYear()))
  }

  const toggleView = () => {
    setIsYearView(!isYearView)
    if (!isYearView) {
      setYearRange(generateYearRange(date?.getFullYear() || new Date().getFullYear()))
    }
  }

  return (
    (<div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => changeYear(-1)}
          aria-label="Previous year">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={toggleView}
          aria-label={isYearView ? "Show months" : "Show years"}>
          {isYearView
            ? `${yearRange[0]} - ${yearRange[yearRange.length - 1]}`
            : date?.getFullYear() || new Date().getFullYear()}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => changeYear(1)}
          aria-label="Next year">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {isYearView
          ? yearRange.map((year) => (
              <Button
                key={year}
                variant="ghost"
                className={cn(
                  "h-8 w-full",
                  year === (date?.getFullYear() || new Date().getFullYear()) &&
                    "bg-primary text-primary-foreground"
                )}
                onClick={() => handleYearSelect(year)}
                aria-label={`Select year ${year}`}
                aria-selected={year === (date?.getFullYear() || new Date().getFullYear())}>
                {year}
              </Button>
            ))
          : months.map((month) => (
              <Button
                key={month}
                variant="ghost"
                className={cn("h-8 w-full", month === format(date || new Date(), "MMMM") &&
                  "bg-primary text-primary-foreground")}
                onClick={() => handleMonthSelect(month)}
                aria-label={`Select ${month}`}
                aria-selected={month === format(date || new Date(), "MMMM")}>
                {month.slice(0, 3)}
              </Button>
            ))}
      </div>
    </div>)
  );
}