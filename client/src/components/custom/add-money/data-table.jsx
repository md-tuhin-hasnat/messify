'use client';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function DataTable({
  data,
  onEdit,
  users,
  byDate = false
}) {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ]
  const columns = [
    {
      accessorKey: 'userId',
      header: 'User',
      cell: ({ row }) => {
        const userId = row.getValue('userId')
        const user = users.find(u => u.id === userId)
        return user ? user.name : 'Unknown User'
      },
    },
    {
      accessorKey: 'month',
      header: 'Month',
      cell: ({row}) => `${months[row.getValue('month')-1].label}`
    },
  ]
  if(byDate){
    columns.push({
        accessorKey: 'date',
        header: 'Date of Contribution',
        cell: ({row}) => `${row.getValue('date')!=='-'?new Date(row.getValue('date')).getDate():""}${row.getValue('date')!=='-'?'/': "-"}${row.getValue('date')!=='-'?new Date(row.getValue('date')).getMonth()+1: ""}${row.getValue('date')!=='-'?'/': ""}${row.getValue('date')!=='-'?new Date(row.getValue('date')).getFullYear():""}`
    });
    columns.push({
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => `৳ ${row.getValue('amount')}`,
    });
    columns.push({
      id: 'actions',
      cell: ({ row }) => (
        <Button
          onClick={() => {
            // TODO: Replace this with an API call to fetch the full contribution data if needed
            // Needs to pass: row.original.id
            // const fetchContribution = async () => {
            //   const response = await axios.get(`/api/contributions/${row.original.id}`);
            //   onEdit(response.data);
            // }
            // fetchContribution();
            onEdit(row.original)
          }}>Edit</Button>
      ),
    });
  }
  else{
    columns.push({
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => `৳ ${row.getValue('amount')}`,
    });
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    (<div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>)
  );
}

