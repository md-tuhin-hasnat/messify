export const users = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
]
// Mock data for contributions
let contributions = [
  { id: '1', userId: '1', date: '2023-06-15', month: '2023-06', amount: 100 },
  { id: '2', userId: '2', date: '2023-06-16', month: '2023-06', amount: 150 },
  { id: '3', userId: '3', date: '2023-06-17', month: '2023-06', amount: 200 },
  { id: '4', userId: '1', date: '2023-07-01', month: '2023-07', amount: 120 },
  { id: '5', userId: '2', date: '2023-07-02', month: '2023-07', amount: 180 },
];
export const meals = [
  { id: "1", userId: "1", date: "2023-06-01", type: "Breakfast", number: 1 },
  { id: "2", userId: "2", date: "2023-06-01", type: "Lunch", number: 2 },
  { id: "3", userId: "3", date: "2023-06-01", type: "Dinner", number: 1 },
  { id: "4", userId: "1", date: "2023-06-02", type: "Breakfast", number: 2 },
  { id: "5", userId: "2", date: "2023-06-02", type: "Lunch", number: 1 },
]

export function getMealsByDateAndType(date, type) {
  return meals.filter(meal => meal.date === date && meal.type === type);
}

export function addMeal(meal) {
  const newMeal = { ...meal, id: String(meals.length + 1) }
  meals.push(newMeal)
}

export function updateMeal(updatedMeal) {
  const index = meals.findIndex(meal => meal.id === updatedMeal.id)
  if (index !== -1) {
    meals[index] = updatedMeal
  }
}

export function getTotalMealsForDay(date) {
  return meals.filter(meal => meal.date === date)
              .reduce((total, meal) => total + meal.number, 0);
}

export function getTotalMealsForMonth(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  return meals.filter(meal => {
    const mealDate = new Date(meal.date);
    return mealDate >= startDate && mealDate <= endDate;
  }).reduce((total, meal) => total + meal.number, 0);
}

export function addBulkMeal(entry) {
  users.forEach(user => {
    const newMeal = {
      userId: user.id,
      date: entry.date,
      type: entry.type,
      number: entry.number
    };
    addMeal(newMeal);
  });
}

