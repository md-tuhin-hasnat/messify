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

// Dummy data for products
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
    date: null,
    productCategory: "",
    productName: "",
    quantity: 0,
    rate: 0,
    discount: 0,
  });
  const [products, setProducts] = useState(dummyProducts);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionRef = useRef(null);

  useEffect(() => {
    setEntry(
      editingEntry || {
        date: null,
        productCategory: "",
        productName: "",
        quantity: 0,
        rate: 0,
        discount: 0,
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
      [name]: name === "productName" ? value : parseFloat(value) || 0,
    }));

    if (name === "productName") {
      const filteredSuggestions = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setEntry((prev) => ({ ...prev, productName: suggestion }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subtotal = entry.quantity * entry.rate - entry.discount;
    if (!products.includes(entry.productName)) {
      setProducts([...products, entry.productName]);
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
          <Label htmlFor="productCategory">Product Category</Label>
          <Select
            value={entry.productCategory}
            onValueChange={(value) =>
              setEntry((prev) => ({ ...prev, productCategory: value }))
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
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            name="productName"
            value={entry.productName}
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
