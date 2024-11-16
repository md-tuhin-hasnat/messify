'use client';
import { Button } from "@/components/ui/button"
import { LayoutGrid, Receipt, Lightbulb } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ExpenseCategorySelector({
  category,
  onCategorySelect
}) {
  return (
    (<div className="flex flex-col space-y-2">
      <Button
        variant="outline"
        className={cn(
          "justify-start",
          category === "All Expense" && "bg-primary text-primary-foreground"
        )}
        onClick={() => onCategorySelect("All Expense")}>
        <LayoutGrid className="mr-2 h-4 w-4" />
        All Expense
      </Button>
      <Button
        variant="outline"
        className={cn(
          "justify-start",
          category === "Meal Expense" && "bg-primary text-primary-foreground"
        )}
        onClick={() => onCategorySelect("Meal Expense")}>
        <Receipt className="mr-2 h-4 w-4" />
        Meal Expense
      </Button>
      <Button
        variant="outline"
        className={cn(
          "justify-start",
          category === "Utility Expense" && "bg-primary text-primary-foreground"
        )}
        onClick={() => onCategorySelect("Utility Expense")}>
        <Lightbulb className="mr-2 h-4 w-4" />
        Utility Expense
      </Button>
    </div>)
  );
}