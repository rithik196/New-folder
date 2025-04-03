import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "../redux/reducers/formReducer";

export const store = configureStore({
  reducer: {
    form: formReducer, // Handles form data and BIC updates
  },
});
