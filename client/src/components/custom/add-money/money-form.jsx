import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function MoneyForm({
  onSubmit,
  initialData,
  users
}) {
  const [formData, setFormData] = useState(initialData || {
    userId: '',
    date: '',
    month: '',
    amount: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    (<form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User</label>
        <Select
          name="userId"
          onValueChange={(value) => handleSelectChange('userId', value)}
          defaultValue={formData.userId}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Contribution</label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required />
      </div>
      <div>
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
        <Input
          type="month"
          id="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
          required />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required />
      </div>
      <Button type="submit">
        {initialData ? 'Update Contribution' : 'Add Contribution'}
      </Button>
    </form>)
  );
}

