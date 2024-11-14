import { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function EntryList({ entries, onEdit, onDelete, total }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="mt-4 space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="border border-border rounded-lg select-none"
        >
          <div
            className="p-3 flex justify-between"
            onClick={() =>
              setExpandedId(expandedId === entry.id ? null : entry.id)
            }
          >
            <div className="flex flex-col">
              <span className="text-xs text-foreground/60">
                {entry.date ? format(entry.date, "PPP") : ""}
              </span>
              <span>{entry.productName}</span>
            </div>
            <div className="flex gap-1">
              <Button
                className=" bg-primary p-2 rounded text-white"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(entry)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                className=" bg-red-600 p-2 rounded text-white mr-4"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onDelete(entry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {expandedId === entry.id ? (
                <ChevronUp className="h-6 w-6 mx-0 my-auto" />
              ) : (
                <ChevronDown className="h-6 w-6 mx-0 my-auto" />
              )}
            </div>
          </div>
          {expandedId === entry.id && (
            <div className="p-4">
              <p className="flex justify-between">
                <span>Date</span>
                <span>{entry.date ? format(entry.date, "PPP") : ""}</span>
              </p>
              <p className="flex justify-between">
                <span>Quantity</span>
                <span>{entry.quantity}</span>
              </p>
              <p className="flex justify-between">
                <span>Rate (TK)</span>
                <span>{entry.rate.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Discount (TK)</span>
                <span>{entry.discount.toFixed(2)}</span>
              </p>
              <Separator className="my-1 h-[2px] bg-gray-400" />
              <p className="flex justify-between">
                <span>Subtotal (TK)</span>
                <span>{entry.subtotal.toFixed(2)}</span>
              </p>
            </div>
          )}
        </div>
      ))}
      <p className="text-right">Total: {total.toFixed(2)} TK</p>
    </div>
  );
}
