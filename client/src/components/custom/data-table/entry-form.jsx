"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/custom/data-table/date-picker"

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
]

export default function EntryForm({ isOpen, onClose, onSubmit, editingEntry }) {
  const [entry, setEntry] = useState({
    mess_code: "",
    product_name: "",
    product_category: "",
    quantity: 0,
    rate: 0,
    subtotal: 0,
    discount: 0,
    date: new Date(),
  })
  const [products, setProducts] = useState(dummyProducts)
  const [suggestions, setSuggestions] = useState([])
  const suggestionRef = useRef(null)

  useEffect(() => {
    setEntry(
      editingEntry || {
        mess_code: "",
        product_name: "",
        product_category: "",
        quantity: 0,
        rate: 0,
        subtotal: 0,
        discount: 0,
        date: new Date(),
      }
    )
  }, [editingEntry])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEntry((prev) => ({
      ...prev,
      [name]: name === "product_name" ? value : parseFloat(value) || 0,
      mess_code: localStorage.getItem("MessCode"),
    }))

    if (name === "product_name") {
      const filteredSuggestions = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setEntry((prev) => ({ ...prev, product_name: suggestion }))
    setSuggestions([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subtotal = entry.quantity * entry.rate - entry.discount
    if (!products.includes(entry.product_name)) {
      setProducts([...products, entry.product_name])
    }
    onSubmit({ ...entry, subtotal })
    onClose()
  }

  const handleDateChange = (date) => {
    setEntry((prev) => ({ ...prev, date: date || new Date() }))
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {editingEntry ? "Edit Entry" : "Add New Entry"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <DatePicker
            selectedDate={entry.date}
            onChange={handleDateChange}
          />
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={entry.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Rate (TK)</Label>
          <Input
            id="rate"
            name="rate"
            type="number"
            value={entry.rate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (TK)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            value={entry.discount}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">{editingEntry ? "Update" : "Add"}</Button>
      </form>
    </DialogContent>
  )
}