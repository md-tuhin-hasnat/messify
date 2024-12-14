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
  users
}) {
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
      accessorKey: 'date',
      header: 'Date of Contribution',
    },
    {
      accessorKey: 'month',
      header: 'Month',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => `৳ ${row.getValue('amount')}`,
    },
    {
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
    },
  ]

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

