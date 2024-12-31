'use client';

import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clipboard, DollarSign, Users, ShoppingCart, CreditCard, User, Hash, FileQuestion } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { backendURL } from '@/lib/secret';
import { MessContext } from '@/app/providers';

export default function HomePage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { messValue } = useContext(MessContext);
  const [messCode, setMessCode] = useState(localStorage.getItem('MessCode') || "NUN");

  // Update messCode when messValue changes
  useEffect(() => {
    setMessCode(messValue);
  }, [messValue]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const month = new Date().toISOString().slice(0, 7); // Format as YYYY-MM
        const response = await axios.get(
          `${backendURL}/get-data/${messCode}/${new Date()}`,
          { withCredentials: true }
        );
        setDashboardData(response.data);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: error.message || "Failed to fetch dashboard data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (messCode) fetchDashboardData();
  }, [messCode, messValue]);

  const copyMessCode = () => {
    if (dashboardData?.messCode) {
      navigator.clipboard.writeText(dashboardData.messCode);
      toast({
        title: "Copied!",
        description: "Mess code copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <FileQuestion className="w-24 h-24 text-gray-400" />
            <p className="text-center text-gray-700">
              Unable to fetch dashboard data. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = [
    { name: 'Previous Month', expenses: dashboardData.previousMonthExpenses },
    { name: 'Current Month', expenses: dashboardData.currentMonthExpenses },
  ];

  return dashboardData.messCode !== "NUN" ? (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-medium">Personal Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Expense */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Personal Expense</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳ {dashboardData.personalExpense.toLocaleString()}</div>
          </CardContent>
        </Card>

        {/* Total Contribution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Personal Contribution</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳{dashboardData.totalContribution.toLocaleString()}</div>
          </CardContent>
        </Card>

        {/* Total Meals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Personal Meals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{dashboardData.totalMeals.toLocaleString()}</div>
          </CardContent>
        </Card>

        {/* Supervisor Name */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Supervisor Name</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{dashboardData.supervisorName}</div>
          </CardContent>
        </Card>

        {/* Mess Code */}
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

        {/* Predicted Meal Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Meal Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳{dashboardData.predictedMealRate?.toFixed(2) || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Comparison Chart */}
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
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">No Mess Selected</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <FileQuestion className="w-24 h-24 text-gray-400" />
          <p className="text-center text-gray-700">
            Select a mess to see data. If you don't have a mess, then join or create a mess.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
