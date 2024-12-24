'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Clipboard, DollarSign, Users, ShoppingCart, CreditCard, User, Hash } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import axios from 'axios'
import { backendURL } from '@/lib/secret'

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDashboardData = async () => {
      const data = await getDashboardData()
      setDashboardData(data)
    }
    fetchDashboardData()
  }, [])


  const getDashboardData = async () => {
    const month = new Date();
    const response = await axios.get(
      `${backendURL}/api/dashboard/get-data/${localStorage.getItem('MessCode')}/${month}`,
      { withCredentials: true }
    );
    return response.data;
  };
  const copyMessCode = () => {
    if (dashboardData) {
      navigator.clipboard.writeText(dashboardData.messCode)
      toast({
        title: "Copied!",
        description: "Mess code copied to clipboard.",
      })
    }
  }

  if (!dashboardData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const chartData = [
    { name: 'Previous Month', expenses: dashboardData.previousMonthExpenses },
    { name: 'Current Month', expenses: dashboardData.currentMonthExpenses },
  ]

  return (
    (<div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-medium">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expense</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳{dashboardData.totalExpense.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Contribution</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳{dashboardData.totalContribution.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Meals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{dashboardData.totalMeals.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Supervisor Name</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{dashboardData.supervisorName}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mess Code</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-medium">{dashboardData.messCode}</div>
              <Button variant="outline" size="icon" onClick={copyMessCode}>
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Meal Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳{dashboardData.predictedMealRate?.toFixed(2)|| 0}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Expense Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expenses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>)
  );
}

