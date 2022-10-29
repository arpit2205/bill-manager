import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: 0,
  reducers: {
    setBudget: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
