const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../src/app');
const { expense } = require('../src/models/expense.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await expense.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Expense API', () => {
  const mockExpense = {
    mess_code: 'ww7w7n',
    product_name: 'Rice',
    product_category: 'Meal Expense',
    quantity: 10,
    rate: 72,
    discount: 0,
    subtotal: 720,
    date: '2024-12-11T18:00:00.000+00:00',
  };

  it('should add a new expense (addExpense)', async () => {
    const response = await request(app)
      .post('/api/expense/add-expense')
      .send(mockExpense)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.id).toBeDefined();

    const savedExpense = await expense.findOne({ mess_code: 'ww7w7n' });

    expect(savedExpense.mess_code).toBe(mockExpense.mess_code);
    expect(savedExpense.product_name).toBe(mockExpense.product_name);
    expect(savedExpense.product_category).toBe(mockExpense.product_category);
    expect(savedExpense.quantity).toBe(mockExpense.quantity);
    expect(savedExpense.rate).toBe(mockExpense.rate);
    expect(savedExpense.discount).toBe(mockExpense.discount);
    expect(savedExpense.subtotal).toBe(mockExpense.subtotal);
    expect(new Date(savedExpense.date).toISOString()).toBe(
      new Date(mockExpense.date).toISOString()
    );
  });

  it('should fetch all expenses by mess code (getExpense)', async () => {
    await expense.create(mockExpense);

    const response = await request(app)
      .get('/api/expense/get-expense/ww7w7n')
      .expect(200);

    expect(response.body.success).toBe(true);
    const fetchedExpense = response.body.expenses[0];
    expect(fetchedExpense.mess_code).toBe(mockExpense.mess_code);
    expect(fetchedExpense.product_name).toBe(mockExpense.product_name);
    expect(fetchedExpense.product_category).toBe(mockExpense.product_category);
    expect(fetchedExpense.quantity).toBe(mockExpense.quantity);
    expect(fetchedExpense.rate).toBe(mockExpense.rate);
    expect(fetchedExpense.discount).toBe(mockExpense.discount);
    expect(fetchedExpense.subtotal).toBe(mockExpense.subtotal);
    expect(new Date(fetchedExpense.date).toISOString()).toBe(
      new Date(mockExpense.date).toISOString()
    );
  });
});
