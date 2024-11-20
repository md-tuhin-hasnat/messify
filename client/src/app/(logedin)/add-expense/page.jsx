import DataTableComponent from "@/components/custom/data-table/data-table";

export default function AddExpense() {
  return (
    <>
      <DataTableComponent isAdmin={true} />
    </>
  );
}
