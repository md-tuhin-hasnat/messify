// 'use client';
// import { useState, useEffect } from 'react'
// import { DataTable } from '@/components/custom/add-money/data-table'
// import { DateSelector } from '@/components/custom/meal-report/date-selector'
// import { MonthSelector } from '@/components/custom/add-money/month-selector'
// import { MoneyForm } from '@/components/custom/add-money/money-form'
// import { Button } from "@/components/ui/button"
// import { 
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import axios from 'axios';
// import { backendURL } from '@/lib/secret';
// import { toast } from '@/hooks/use-toast';

// export default function AddMoneyPage() {
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date()
//     return today.toISOString().split('T')[0]+"T00:00:00.000+00:00";
//   })
//   const [selectedMonth, setSelectedMonth] = useState(() => {
//     const today = new Date()
//     return today.getMonth() + 1;
//   })
//   const [contributions, setContributions] = useState([])
//   const [contributionsByDate, setContributionsByDate] = useState([])
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [editingContribution, setEditingContribution] = useState(null)
//   const [totalContributions, setTotalContributions] = useState(0)
//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       // API call to fetch initial data
//       const response = await axios.get(
//         `${backendURL}/api/contribution/get-contribution/${selectedMonth}/${localStorage.getItem('MessCode')}`,
//         { withCredentials: true }
//       );
//       console.log(response);
//       setContributions(response.data.contributions);
//       setContributionsByDate(response.data.contributionsByDate);
//     }
//     fetchInitialData()
//   }, [])

//   useEffect(() => {
//     const fetchTotals = async () => {
//       // TODO: Replace with API call to fetch totals
//       // Needs to pass: selectedMonth
//       const response = await axios.get(
//         `${backendURL}/api/contribution/get-total-contribution/${selectedMonth}/${localStorage.getItem('MessCode')}`,
//         { withCredentials: true }
//       );
//       setTotalContributions(response.data.total);
//     }
//     fetchTotals()
//   }, [selectedMonth, contributions])

//   useEffect(() => {
//     // API call to fetch users
//     const fetchUsers = async () => {
//       const mess_code = localStorage.getItem('MessCode');
//       const response = await axios.get(
//         `${backendURL}/api/mess/get-user/${mess_code}`,
//         { withCredentials: true }
//       );
//       setUsers(response.data);
//     }
//     fetchUsers();
//   }, [])

//   const handleDateChange = (date) => {
//     setSelectedDate(date)
//     updateContributions(date, selectedMonth)
//   }

//   const handleMonthChange = (month) => {
//     setSelectedMonth(month)
//     updateContributions(selectedDate, month)
//   }

//   const updateContributions = async (date, month) => {
//     // Replace with API call to fetch contributions
//     // Needs to pass: date, month
//     const response = await axios.get(
//       `${backendURL}/api/contribution/get-contribution/${month}/${localStorage.getItem('MessCode')}`,
//       { withCredentials: true }
//     );
//     setContributions(response.data.contributions);
//     setContributionsByDate(response.data.contributionsByDate);
//   }

//   const handleAddContribution = async (contribution) => {
//     // Replace with API call to add contribution
//     // Needs to pass: contribution object
//     console.log(contribution);
//     const _month = new Date(contribution.month);
//     const Month = _month.getMonth()+1;
//     const response = await axios.post(
//       `${backendURL}/api/contribution/add-money`,
//       {
//         userId: contribution.userId,
//         date: contribution.date,
//         month: Month,
//         amount: contribution.amount,
//         mess_code: localStorage.getItem('MessCode')
//       },
//       { withCredentials: true }
//     );
//     if(response.status===201){
//       toast({
//         title: "Done!",
//         description: "Contribution Recorded Successfully",
//       });
//       updateContributions(selectedDate, selectedMonth)
//       setIsAddDialogOpen(false)
//     }
//     else{
//       toast({
//         variant: "destructive",
//         title: "Oh No! Something went wrong",
//         description: "Failed to Record Contribution.",
//       });
//     }
//   }

//   const handleEditContribution = (contribution) => {
//     setEditingContribution(contribution)
//     setIsEditDialogOpen(true)
//   }

//   const handleUpdateContribution = async (updatedContribution) => {
//     // TODO: Replace with API call to update contribution
//     // Needs to pass: updatedContribution object
//     // await axios.put(`/api/contributions/${updatedContribution.id}`, updatedContribution);
//     updateContributions(selectedDate, selectedMonth)
//     setIsEditDialogOpen(false)
//   }

//   return (
//     (<div className="container mx-auto p-4">
//       <h1 className="text-2xl font-medium mb-4">Add Money</h1>
//       <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
//         <div className="flex flex-row justify-between gap-4 mb-4">
//           <DateSelector onChange={handleDateChange} defaultValue={selectedDate} />
//           <MonthSelector onChange={handleMonthChange} defaultValue={selectedMonth} />
//         </div>
//         <div className="flex flex-row justify-end gap-4 mb-4">
//           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//             <DialogTrigger asChild>
//               <Button>Add Contribution</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add Contribution</DialogTitle>
//               </DialogHeader>
//               <MoneyForm onSubmit={handleAddContribution} users={users} />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div className="mb-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-medium">৳ {totalContributions}</div>
//             <p className="text-xs text-muted-foreground">for {new Date(selectedDate).toLocaleString('default', { month: 'long' })} {new Date(selectedDate).getFullYear()}</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">All Contributions</h2>
//         <DataTable data={contributions} onEdit={handleEditContribution} users={users} />
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Contributions by Date</h2>
//         <DataTable data={contributionsByDate} onEdit={handleEditContribution} users={users} />
//       </div>
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Contribution</DialogTitle>
//           </DialogHeader>
//           {editingContribution && (
//             <MoneyForm
//               onSubmit={handleUpdateContribution}
//               initialData={editingContribution}
//               users={users} />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>)
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/custom/add-money/data-table';
import { MonthYearSelector } from '@/components/custom/add-money/month-year-selector'; // Import new MonthYearSelector
import { MoneyForm } from '@/components/custom/add-money/money-form';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import { backendURL } from '@/lib/secret';
import { toast } from '@/hooks/use-toast';

export default function AddMoneyPage() {
  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    const today = new Date();
    return {
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  });
  const [contributions, setContributions] = useState([]);
  const [contributionsByDate, setContributionsByDate] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContribution, setEditingContribution] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);
  const [users, setUsers] = useState([]);

  const fetchInitialData = async () => {
    const { month, year } = selectedMonthYear;
    const response = await axios.get(
      `${backendURL}/api/contribution/get-contribution/${month}/${year}/${localStorage.getItem('MessCode')}`,
      { withCredentials: true }
    );
    setContributions(response.data.contributions);
    setContributionsByDate(response.data.contributionsByDate);
  };
  useEffect(() => {
    fetchInitialData();
  }, [selectedMonthYear]);

  useEffect(() => {
    const fetchTotals = async () => {
      const { month, year } = selectedMonthYear;
      const response = await axios.get(
        `${backendURL}/api/contribution/get-total-contribution/${month}/${year}/${localStorage.getItem('MessCode')}`,
        { withCredentials: true }
      );
      setTotalContributions(response.data.total);
    };
    fetchTotals();
  }, [selectedMonthYear, contributions]);
  useEffect(() => {
    const fetchUsers = async () => {
      const mess_code = localStorage.getItem('MessCode');
      const response = await axios.get(
        `${backendURL}/api/mess/get-user/${mess_code}`,
        { withCredentials: true }
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleMonthYearChange = (value) => {
    setSelectedMonthYear(value);
  };

  const handleAddContribution = async (contribution) => {
    const response = await axios.post(
      `${backendURL}/api/contribution/add-money`,
      {
        userId: contribution.userId,
        date: contribution.date,
        month: contribution.month,
        year: contribution.year,
        amount: contribution.amount,
        mess_code: localStorage.getItem('MessCode'),
      },
      { withCredentials: true }
    );
    if (response.status === 201) {
      toast({
        title: "Done!",
        description: "Contribution Recorded Successfully",
      });
      setIsAddDialogOpen(false);
      fetchInitialData();
    } else {
      toast({
        variant: "destructive",
        title: "Oh No! Something went wrong",
        description: "Failed to Record Contribution.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-medium mb-4">Add Money</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
        <MonthYearSelector
          defaultValue={selectedMonthYear}
          onChange={handleMonthYearChange}
        />
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Contribution</Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <MoneyForm onSubmit={handleAddContribution} users={users} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">৳ {totalContributions}</div>
            <p className="text-xs text-muted-foreground">
              for {new Date().toLocaleString('default', { month: 'long' })} {selectedMonthYear.year}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Per Member Contribution</h2>
        <DataTable data={contributions} users={users} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Contributions by Date</h2>
        <DataTable data={contributionsByDate} users={users} byDate={true} />
      </div>
    </div>
  );
}
