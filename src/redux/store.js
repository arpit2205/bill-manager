import { configureStore } from "@reduxjs/toolkit";

import billReducer from "./billSlice";
import budgetReducer from "./budgetSlice";

export default configureStore({
  reducer: {
    bills: billReducer,
    budget: budgetReducer,
  },
});
