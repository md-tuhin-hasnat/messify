'use client';
import { useState, useEffect, useContext } from 'react'
import { DataTable } from '@/components/custom/meal-report/data-table'
import { DateSelector } from '@/components/custom/meal-report/date-selector'
import { MealTypeSelector } from '@/components/custom/meal-report/meal-type-selector'
import { MealForm } from '@/components/custom/meal-report/meal-form'
import { BulkMealForm } from '@/components/custom/meal-report/bulk-meal-form'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { backendURL } from '@/lib/secret';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { MessContext } from '@/app/providers';

export default function MealReportPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    let td = today.toISOString().split('T')[0];
    td = td + "T00:00:00.000+00:00";
    return td;
  })
  const [selectedMealType, setSelectedMealType] = useState('All_Meal')
  const [meals, setMeals] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isBulkAddDialogOpen, setIsBulkAddDialogOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState(null)
  const [totalMealsForDay, setTotalMealsForDay] = useState(0)
  const [totalMealsForMonth, setTotalMealsForMonth] = useState(0)
  const [users, setUsers] = useState([])
  const { messValue, setMessValue } = useContext(MessContext);
  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await axios.get(
        `${backendURL}/api/meal/get-meal/${selectedDate}/${selectedMealType}/${localStorage.getItem('MessCode')}`,
        { withCredentials: true }
      );
      setMeals(response.data);
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    const fetchTotals = async () => {
      if (selectedDate) {
        // Replace with API call to fetch totals
        // Needs to pass: selectedDate
        const response = await axios.get(
          `${backendURL}/api/meal/totals/${selectedDate}/${localStorage.getItem('MessCode')}`,
          { withCredentials: true }
        );
        setTotalMealsForDay(response.data.daily);
        setTotalMealsForMonth(response.data.monthly);
      }
    }
    fetchTotals()
  }, [selectedDate, meals])

  useEffect(() => {
    //  Replace with API call to fetch users
    const fetchUsers = async () => {
      const mess_code = localStorage.getItem('MessCode');
      const response = await axios.get(
        `${backendURL}/api/mess/get-user/${mess_code}`,
        { withCredentials: true }
      );
      // console.log(response);
      setUsers(response.data);
    }
    fetchUsers();
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    updateMeals(date, selectedMealType)
  }

  const handleMealTypeChange = (type) => {
    setSelectedMealType(type)
    updateMeals(selectedDate, type)
  }

  const updateMeals = async (date, type) => {
    // Replace with API call to fetch meals
    // Needs to pass: date, type
    const response = await axios.get(
      `${backendURL}/api/meal/get-meal/${date}/${type}/${localStorage.getItem('MessCode')}`,
      { withCredentials: true }
    );
    setMeals(response.data);

  }

  const handleAddMeal = async (meal) => {
    // API call to add meal
    // console.log("meal", meal);
    // Needs to pass: meal object
    const response = await axios.post(
      `${backendURL}/api/meal/add-meal`,
      {
        date: meal.date,
        number: meal.number,
        type: meal.type,
        userId: meal.userId,
        mess_code: localStorage.getItem('MessCode')
      },
      { withCredentials: true }
    );

    if (response.status === 201) {
      toast({
        title: "Done!",
        description: "Meals Recorded Successfully",
      });
      updateMeals(selectedDate, selectedMealType)
      setIsBulkAddDialogOpen(false)
    }
    else {
      toast({
        variant: "destructive",
        title: "Oh No! Something went wrong",
        description: "Failed to Record Meal.",
      });
    }
    updateMeals(selectedDate, selectedMealType)
    setIsAddDialogOpen(false)
  }

  const handleEditMeal = (meal) => {
    setEditingMeal(meal)
    setIsEditDialogOpen(true)
  }

  const handleUpdateMeal = async (updatedMeal) => {
    // TODO: Replace with API call to update meal
    // Needs to pass: updatedMeal object
    // await axios.post(`/api/meals/${updatedMeal.id}`, updatedMeal);
    updateMeals(selectedDate, selectedMealType)
    setIsEditDialogOpen(false)
  }

  const handleBulkAddMeal = async (entry) => {
    // Replace with API call to bulk add meals
    const response = await axios.post(
      `${backendURL}/api/meal/add-bulk`,
      {
        date: entry.date,
        number: entry.number,
        type: entry.type,
        mess_code: localStorage.getItem('MessCode')
      },
      { withCredentials: true }
    );
    if (response.status === 201) {
      toast({
        title: "Done!",
        description: "Meals Recorded Successfully",
      });
      updateMeals(selectedDate, selectedMealType)
      setIsBulkAddDialogOpen(false)
    }
    else {
      toast({
        variant: "destructive",
        title: "Oh No! Something went wrong",
        description: "Failed to Record Meal.",
      });
    }
  }

  return (
    messValue !== null && (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-medium mb-4">Meal Report</h1>
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
            <div className="text-2xl font-medium">{totalMealsForDay}</div>
            <p className="text-xs text-muted-foreground">meals on {selectedDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{totalMealsForMonth}</div>
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

