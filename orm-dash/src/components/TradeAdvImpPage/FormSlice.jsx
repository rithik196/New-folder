import { createSlice } from "@reduxjs/toolkit";

const initialFormData = {
  basicDetails: {},
  transactionDetails: {},
  beneficiaryDetails: {},
  invoiceDetails: {},
  shipmentDetails: {},
  attachments: {},
  declarations: {},
  dealDetails: {},
  remittanceAccountDetails: [],
};

const formSlice = createSlice({
  name: "form",
  initialState: {
    currentTab: 0,
    formData: initialFormData,
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    updateTabData: (state, action) => {
      const { tabKey, data } = action.payload;
      state.formData[tabKey] = data;
    },
    resetForm: (state) => {
      state.formData = initialFormData;
      state.currentTab = 0;
    },
  },
});

export const { setCurrentTab, updateTabData, resetForm } = formSlice.actions;
export default formSlice.reducer;
