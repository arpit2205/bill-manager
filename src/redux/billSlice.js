import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const billSlice = createSlice({
  name: "bills",
  initialState: [
    {
      id: uuidv4(),
      category: "FoodNDining",
      description: "Dominoes",
      amount: 430,
      date: "2022-10-01",
    },
    {
      id: uuidv4(),
      category: "utility",
      description: "Car wash",
      amount: 500,
      date: "2022-10-02",
    },
    {
      id: uuidv4(),
      category: "shopping",
      description: "Amazon",
      amount: 2030,
      date: "2022-10-03",
    },
    {
      id: uuidv4(),
      category: "Food & Dining",
      description: "House rent",
      amount: 35900,
      date: "2022-10-04",
    },
    {
      id: uuidv4(),
      category: "education",
      description: "Tuition",
      amount: 2200,
      date: "2022-10-05",
    },
    {
      id: uuidv4(),
      category: "Personal Care",
      description: "Laundry",
      amount: 320,
      date: "2022-10-06",
    },
    {
      id: uuidv4(),
      category: "Travel",
      description: "Vacation",
      amount: 3430,
      date: "2022-10-07",
    },
  ],
  reducers: {
    addBill: (state, action) => {
      state.push({
        id: uuidv4(),
        category: action.payload.category,
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
      });

      // sort array by date
      state.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },

    deleteBill: (state, action) => {
      return state.filter((bill) => bill.id !== action.payload);
    },

    editBill: (state, action) => {
      const index = state.findIndex((bill) => bill.id === action.payload.id);
      state[index].category = action.payload.category;
      state[index].description = action.payload.description;
      state[index].amount = action.payload.amount;
      state[index].date = action.payload.date;
    },
  },
});

export const { addBill, deleteBill, editBill } = billSlice.actions;

export default billSlice.reducer;
