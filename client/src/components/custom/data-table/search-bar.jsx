"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar } from "lucide-react";
import { IconDatePickerComponent } from "./icon-date-picker";
import IconMonthPickerComponent from "./icon-month-picker";
import FilterComponent from "./filter";

// Sample data for suggestions
const sampleSuggestions = [
  "React hooks",
  "React components",
  "React router",
  "React state management",
  "React performance optimization",
  "React server components",
  "React testing",
  "React native",
  "React context API",
  "React suspense",
];

export function SearchBar({sampleSuggestions, onSearch}) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 0) {
      const filtered = sampleSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Searching for:", input);
    onSearch(input);
    setShowSuggestions(false);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    // console.log(selectedMonth);
  };
  const handleCategoryChange = () => {
    // console.log(selectedMonth);
  };
  return (
    <div className="w-full md:max-w-xs pb-3">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center space-x-2">
          <FilterComponent
            onMonthChange={handleMonthChange}
            onCategoryChange={handleCategoryChange}
          />
          <div className="relative flex-grow flex items-center">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={input}
              onChange={handleInputChange}
              className="pr-10 w-full"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 rounded-l-none"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto shadow-md"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
