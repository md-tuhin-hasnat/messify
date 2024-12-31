"use client"
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useContext } from "react";
import { MessContext } from "@/app/providers";

export default function EntryTable({ entries, onEdit, onDelete, total }) {
  const { isAdmin } = useContext(MessContext);
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted">
          <th className="p-2 text-left font-normal">Date</th>
          <th className="p-2 text-left font-normal">Product</th>
          <th className="p-2 text-right font-normal">Qty</th>
          <th className="p-2 text-right font-normal">Rate (TK)</th>
          <th className="p-2 text-right font-normal">Discount (TK)</th>
          <th className="p-2 text-right font-normal">Subtotal (TK)</th>
          {(isAdmin && <th className="p-2 text-center font-normal">Actions</th>)}
        </tr>
      </thead>
      <tbody>
        {entries?.map((entry) => (
          <tr key={entry.id} className="border-b border-muted">
            <td className="p-2">
              {entry.date ? format(entry.date, "PPP") : ""}
            </td>
            <td className="p-2">{entry.product_name}</td>
            <td className="p-2 text-right">{entry.quantity}</td>
            <td className="p-2 text-right">{entry.rate?.toFixed(2)}</td>
            <td className="p-2 text-right">{entry.discount?.toFixed(2)}</td>
            <td className="p-2 text-right">{entry.subtotal?.toFixed(2)}</td>
            {(isAdmin && <td className="p-2 flex gap-1 justify-center">
              <Button
                className="bg-primary"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(entry)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                className="bg-red-600"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onDelete(entry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </td>)}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-muted">
          <td colSpan={5} className="p-2 text-right">
            Total:
          </td>
          <td className="p-2 text-right">{total?.toFixed(2)} TK</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}
