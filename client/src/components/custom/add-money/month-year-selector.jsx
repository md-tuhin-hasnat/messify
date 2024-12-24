import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MonthYearSelector({ onChange, defaultValue }) {
  const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleSelectionChange = (month, year) => {
    onChange({ month, year });
  };

  return (
    <div className="flex gap-4">
      <Select
        defaultValue={defaultValue.month.toString()}
        onValueChange={(value) => handleSelectionChange(parseInt(value), defaultValue.year)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map(({ label, value }) => (
            <SelectItem key={value} value={value.toString()}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={defaultValue.year.toString()}
        onValueChange={(value) => handleSelectionChange(defaultValue.month, parseInt(value))}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
