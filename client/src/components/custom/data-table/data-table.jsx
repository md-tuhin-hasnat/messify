"use client";
import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EntryForm from "./entry-form";
import EntryTable from "./entry-table-desktop";
import EntryList from "./entry-table-mobile";
import { SearchBar } from "./search-bar";

export default function DataTableComponent() {
  const [entries, setEntries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const handleAddOrUpdateEntry = (entry) => {
    setEntries((prevEntries) => {
      if (entry.id) {
        return prevEntries.map((e) => (e.id === entry.id ? entry : e));
      } else {
        return [...prevEntries, { ...entry, id: Date.now() }];
      }
    });
    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleDelete = useCallback(
    (id) => setEntries((prev) => prev.filter((entry) => entry.id !== id)),
    []
  );

  const total = entries.reduce((sum, entry) => sum + entry.subtotal, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-1 justify-between">
        <SearchBar />
        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="mr-2 h-4 w-4 hidden md:flex" /> Add
              </Button>
            </DialogTrigger>
            <EntryForm
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSubmit={handleAddOrUpdateEntry}
              editingEntry={editingEntry}
            />
          </Dialog>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <EntryTable
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          total={total}
        />
      </div>

      {/* Mobile List View */}
      <div className="md:hidden">
        <EntryList
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          total={total}
        />
      </div>
    </div>
  );
}
