"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./date-picker";

//TODO: Dummy data for products
const dummyProducts = [
  "Rice",
  "Bread",
  "Milk",
  "Eggs",
  "Electricity",
  "Water",
  "Gas",
  "Internet",
  "Phone",
];

export default function EntryForm({ isOpen, onClose, onSubmit, editingEntry }) {
  const [entry, setEntry] = useState({
    mess_code:"",
    product_name: "",
    product_category:"",
    quantity:0,
    rate:0,
    subtotal:0,
    discount:0,
    date:null
  });
  const [products, setProducts] = useState(dummyProducts);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionRef = useRef(null);

  useEffect(() => {
    setEntry(
      editingEntry || {
        mess_code:"",
        product_name: "",
        product_category:"",
        quantity:0,
        rate:0,
        subtotal:0,
        discount:0,
        date:null
      }
    );
  }, [editingEntry]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: name === "product_name" ? value : parseFloat(value) || 0,
      mess_code: localStorage.getItem('MessCode')
    }));

    if (name === "product_name") {
      const filteredSuggestions = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setEntry((prev) => ({ ...prev, product_name: suggestion }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subtotal = entry.quantity * entry.rate - entry.discount;
    if (!products.includes(entry.product_name)) {
      setProducts([...products, entry.product_name]);
    }
    onSubmit({ ...entry, subtotal });
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {editingEntry ? "Edit Entry" : "Add New Entry"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DatePicker
          selectedDate={entry.date}
          onChange={(date) => setEntry((prev) => ({ ...prev, date }))}
        />
        <div className="space-y-2">
          <Label htmlFor="product_category">Product Category</Label>
          <Select
            value={entry.product_category}
            onValueChange={(value) =>
              setEntry((prev) => ({ ...prev, product_category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Meal Expense">Meal Expense</SelectItem>
              <SelectItem value="Utility Expense">Utility Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="product_name">Product Name</Label>
          <Input
            id="product_name"
            name="product_name"
            value={entry.product_name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {suggestions.length > 0 && (
            <ul
              ref={suggestionRef}
              className="absolute z-10 w-full border bg-background border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-border cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <LabelInput
          id="quantity"
          label="Quantity"
          type="number"
          value={entry.quantity}
          onChange={handleChange}
        />
        <LabelInput
          id="rate"
          label="Rate (TK)"
          type="number"
          value={entry.rate}
          onChange={handleChange}
        />
        <LabelInput
          id="discount"
          label="Discount (TK)"
          type="number"
          value={entry.discount}
          onChange={handleChange}
        />
        <Button type="submit">{editingEntry ? "Update" : "Add"}</Button>
      </form>
    </DialogContent>
  );
}

function LabelInput({ id, label, type = "text", ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} {...props} required />
    </div>
  );
}
