"use client";
import { useState, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EntryForm from "./entry-form";
import EntryTable from "./entry-table-desktop";
import EntryList from "./entry-table-mobile";
import { SearchBar } from "./search-bar";
import axios from "axios";
import { backendURL } from "@/lib/secret";
import { toast } from "@/hooks/use-toast";

export default function DataTableComponent({ isAdmin }) {
  const [entries, setEntries] = useState([]);
  const [fullEntries, setFullEntries] = useState([]);
  const [sampleSuggestions, setSampleSuggestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  useEffect(()=>{
    const fetchEntry = async ()=>{
      const mess_code = localStorage.getItem('MessCode');
      const response = await axios.get(
        `${backendURL}/api/expense/get-expense/${mess_code}`,
        { withCredentials: true }
      )
      if(response.status === 200){
        console.log(response);
        setEntries(response.data.expenses);
        setFullEntries(response.data.expenses);
        response.data.expenses.map((expense)=>{
          setSampleSuggestions((prev)=>[...prev, expense.product_name]);    
        })
      }
    }
    fetchEntry();
  },[""]);
  const handleAddOrUpdateEntry = async (entry) => {
    try {
      let response;
      console.log(entry);
      if (entry.id) {
        // Editing existing entry
        response = await axios.post(
          `${backendURL}/api/expense/edit-expense`,
          entry,
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast({
            title: "Done",
            description: "Expense was updated successfully.",
          });
          setEntries((prev) =>
            prev.map((e) => (e.id === entry.id ? entry : e))
          );

          setFullEntries((prev) =>
            prev.map((e) => (e.id === entry.id ? entry : e))
          );
        }
      } else {
        // Adding new entry
        response = await axios.post(
          `${backendURL}/api/expense/add-expense`,
          entry,
          { withCredentials: true }
        );
        if (response.status === 201) {
          console.log("Response ",response.data.id);
          toast({
            title: "Done",
            description: "Expense was recorded successfully.",
          });
          setEntries((prev) => [...prev, { ...entry, id: response.data.id }]);
          setFullEntries((prev) => [...prev, { ...entry, id: response.data.id }]);
        }
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oh No! Something went wrong",
        description: "Failed to save expense.",
      });
    } finally {
      setIsDialogOpen(false);
      setEditingEntry(null);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleDelete = useCallback(async (id) =>{
    // Deleting entry
    console.log("ID : ", id)
    try {
      const response = await axios.post(
        `${backendURL}/api/expense/delete-expense`,
        {id},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast({
          title: "Done",
          description: "Expense was Deleted successfully.",
        });
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        setFullEntries((prev) => prev.filter((entry) => entry.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oh No! Something went wrong",
        description: "Failed to delete expense.",
      });
    }
  },[]);

  const total = entries?.reduce((sum, entry) => sum + entry.subtotal, 0);
  const onSearch = (input) =>{
    //Todo: search
    console.log("Search Params: ",input);
    if(input.length > 0){
      const filtered = fullEntries.filter((product) => {
        return product.product_name.toLowerCase().includes(input.toLowerCase())
      })
      setEntries(filtered);
    }
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-1 justify-between">
        <SearchBar
          sampleSuggestions={sampleSuggestions}
          onSearch={onSearch}
        />
        {isAdmin && (
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
        )}
      </div>
      <div className="hidden md:block">
        <EntryTable
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          total={total}
        />
      </div>
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
