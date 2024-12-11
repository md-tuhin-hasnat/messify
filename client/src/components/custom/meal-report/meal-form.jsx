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

export function MealForm({
  onSubmit,
  initialData,
  users
}) {
  const [formData, setFormData] = useState(initialData || {
    userId: '',
    date: '',
    type: 'Breakfast',
    number: 1,
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
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Meal Type</label>
        <Select
          name="type"
          onValueChange={(value) => handleSelectChange('type', value)}
          defaultValue={formData.type}>
          <SelectTrigger>
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Breakfast">Breakfast</SelectItem>
            <SelectItem value="Lunch">Lunch</SelectItem>
            <SelectItem value="Dinner">Dinner</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number of Meals</label>
        <Input
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          min="1"
          required />
      </div>
      <Button type="submit">
        {initialData ? 'Update Meal' : 'Add Meal'}
      </Button>
    </form>)
  );
}

