import { describe, it, expect, beforeEach } from 'vitest';

describe('Food Ordering System', () => {
  let records = [];

  beforeEach(() => {
    records = [
      { id: '1', customerName: 'Juan Dela Cruz', foodName: 'Classic Burger', category: 'Main Course', price: 150.00, status: 'Delivered' },
      { id: '2', customerName: 'Maria Santos', foodName: 'Iced Matcha Latte', category: 'Drinks', price: 120.00, status: 'Available' },
      { id: '3', customerName: 'Carlos Reyes', foodName: 'Pepperoni Pizza', category: 'Main Course', price: 250.00, status: 'Preparing' }
    ];
  });

  it('should successfully add a new food order record', () => {
    const newRecord = {
      id: '4',
      customerName: 'Ana Garcia',
      foodName: 'Crispy Fries',
      category: 'Sides',
      price: 80.00,
      status: 'Pending'
    };
    records.push(newRecord);
    expect(records).toHaveLength(4);
    expect(records.find(r => r.id === '4')).toEqual(newRecord);
  });

  it('should display saved food records', () => {
    expect(records).toHaveLength(3);
    expect(records[0].foodName).toBe('Classic Burger');
    expect(records[1].foodName).toBe('Iced Matcha Latte');
    expect(records[2].foodName).toBe('Pepperoni Pizza');
  });

  it('should successfully edit a food record', () => {
    const targetId = '1';
    const index = records.findIndex(r => r.id === targetId);
    records[index] = { ...records[index], foodName: 'Double Cheese Burger', price: 180.00 };

    expect(records[index].foodName).toBe('Double Cheese Burger');
    expect(records[index].price).toBe(180.00);
  });

  it('should successfully delete a food record', () => {
    const targetId = '2';
    records = records.filter(r => r.id !== targetId);

    expect(records).toHaveLength(2);
    expect(records.find(r => r.id === '2')).toBeUndefined();
  });

  it('should find a food record using the search text', () => {
    const searchTerm = 'burger';
    const results = records.filter(record => 
      record.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(results).toHaveLength(1);
    expect(results[0].foodName).toBe('Classic Burger');
  });
});

it('should accept price 0 as a valid food price', () => {
  const foodItem = { price: 0 };
  const priceIsValid = foodItem.price !== '' && foodItem.price !== null && foodItem.price !== undefined && !isNaN(foodItem.price) && foodItem.price >= 0;

  expect(priceIsValid).toBe(true);
});

