const initialState = {
    formData: {},
    beneficiaryBIC: "",
  intermediaryBIC: "",
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_FORM_DATA":
            return { ...state, formData: action.payload };
            case "SET_BENEFICIARY_BIC":
              return { ...state, beneficiaryBIC: action.payload };
            case "SET_INTERMEDIARY_BIC":
              return { ...state, intermediaryBIC: action.payload };
        default:
            return state;
    }
};
