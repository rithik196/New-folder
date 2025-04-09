import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../components/TradeAdvImpPage/FormSlice"; // Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});