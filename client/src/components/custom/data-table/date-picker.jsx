"use client"

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from 'lucide-react'

export function DatePicker({ selectedDate, onChange, className }) {
  return (
    <div className={`relative ${className}`}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MMMM d, yyyy"
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
    </div>
  )
}
