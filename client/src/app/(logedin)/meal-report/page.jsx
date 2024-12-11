'use client';
import { useState, useEffect } from 'react'
import { getMealsByDateAndType, addMeal, updateMeal, users, addBulkMeal, getTotalMealsForDay, getTotalMealsForMonth } from '@/lib/data.js'
import { DataTable } from '@/components/custom/meal-report/data-table'
import { DateSelector } from '@/components/custom/meal-report//date-selector'
import { MealTypeSelector } from '@/components/custom/meal-report//meal-type-selector'
import { MealForm } from '@/components/custom/meal-report//meal-form'
import { BulkMealForm } from '@/components/custom/meal-report//bulk-meal-form'
import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MealReportPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0];
  })
  const [selectedMealType, setSelectedMealType] = useState('Breakfast')
  const [meals, setMeals] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isBulkAddDialogOpen, setIsBulkAddDialogOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState(null)
  const [totalMealsForDay, setTotalMealsForDay] = useState(0)
  const [totalMealsForMonth, setTotalMealsForMonth] = useState(0)

  useEffect(() => {
    const fetchInitialData = async () => {
      updateMeals(selectedDate, selectedMealType)
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    const fetchTotals = async () => {
      if (selectedDate) {
        const date = new Date(selectedDate)
        setTotalMealsForDay(getTotalMealsForDay(selectedDate))
        setTotalMealsForMonth(getTotalMealsForMonth(date.getFullYear(), date.getMonth() + 1))
      }
    }
    fetchTotals()
  }, [selectedDate, meals])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    updateMeals(date, selectedMealType)
  }

  const handleMealTypeChange = (type) => {
    setSelectedMealType(type)
    updateMeals(selectedDate, type)
  }

  const updateMeals = async (date, type) => {
    const fetchedMeals = getMealsByDateAndType(date, type)
    setMeals(fetchedMeals)
  }

  const handleAddMeal = async (meal) => {
    addMeal(meal)
    updateMeals(selectedDate, selectedMealType)
    setIsAddDialogOpen(false)
  }

  const handleEditMeal = (meal) => {
    setEditingMeal(meal)
    setIsEditDialogOpen(true)
  }

  const handleUpdateMeal = async (updatedMeal) => {
    updateMeal(updatedMeal)
    updateMeals(selectedDate, selectedMealType)
    setIsEditDialogOpen(false)
  }

  const handleBulkAddMeal = async (entry) => {
    addBulkMeal(entry)
    updateMeals(selectedDate, selectedMealType)
    setIsBulkAddDialogOpen(false)
  }

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Report</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
        <div className="flex flex-row justify-between gap-4 mb-4">
          <DateSelector onChange={handleDateChange} defaultValue={selectedDate} />
          <MealTypeSelector onChange={handleMealTypeChange} defaultValue={selectedMealType} />
        </div>
        <div className="flex flex-row justify-end gap-4 mb-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Meal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
              </DialogHeader>
              <MealForm onSubmit={handleAddMeal} users={users} />
            </DialogContent>
          </Dialog>
          <Dialog open={isBulkAddDialogOpen} onOpenChange={setIsBulkAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Bulk Add Meals</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Add Meals</DialogTitle>
              </DialogHeader>
              <BulkMealForm onSubmit={handleBulkAddMeal} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMealsForDay}</div>
            <p className="text-xs text-muted-foreground">meals on {selectedDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMealsForMonth}</div>
            <p className="text-xs text-muted-foreground">meals this month</p>
          </CardContent>
        </Card>
      </div>
      <DataTable data={meals} onEdit={handleEditMeal} users={users} />
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
          </DialogHeader>
          {editingMeal && (
            <MealForm onSubmit={handleUpdateMeal} initialData={editingMeal} users={users} />
          )}
        </DialogContent>
      </Dialog>
    </div>)
  );
}

