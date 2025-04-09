const initialState = {
  formData: {
    basicdetail: {},
  },
  currentTab: 0,
  beneficiaryBIC: "",
  intermediaryBIC: "",
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TAB_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.tabKey]: action.payload.data,
        },
      };
    case "CHANGE_TAB":
      return { ...state, currentTab: action.payload };
    case "RESET_FORM":
      return initialState;
    case "SET_BENEFICIARY_BIC":
      return { ...state, beneficiaryBIC: action.payload };
    case "SET_INTERMEDIARY_BIC":
      return { ...state, intermediaryBIC: action.payload };
    default:
      return state;
  }
};
