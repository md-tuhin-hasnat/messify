import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function MealTypeSelector({
  onChange,
  defaultValue
}) {
  return (
    (<Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select meal type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All_Meal">All Meal</SelectItem>
        <SelectItem value="Breakfast">Breakfast</SelectItem>
        <SelectItem value="Lunch">Lunch</SelectItem>
        <SelectItem value="Dinner">Dinner</SelectItem>
      </SelectContent>
    </Select>)
  );
}

