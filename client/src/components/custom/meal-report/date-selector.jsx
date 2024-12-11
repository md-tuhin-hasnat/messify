import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"

export function DateSelector({
  onChange,
  defaultValue
}) {
  const [date, setDate] = useState(defaultValue ? new Date(defaultValue) : undefined)

  const handleSelect = (newDate) => {
    setDate(newDate)
    if (newDate) {
      onChange(format(newDate, 'yyyy-MM-dd'))
    }
  }

  return (
    (<Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>)
  );
}

