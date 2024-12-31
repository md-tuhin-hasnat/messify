"use client"

import React, { useState } from 'react'
import DatePicker from './data-table/date-picker';

export default function DatePickerTest() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Date Picker Test</h1>
      <DatePicker
        selectedDate={date}
        onChange={(newDate) => setDate(newDate)}
      />
      <p className="mt-4">
        Selected date: {date ? date.toDateString() : 'No date selected'}
      </p>
    </div>
  )
}
