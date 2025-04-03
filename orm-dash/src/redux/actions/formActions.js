export const saveFormData = (data) => ({
  type: "SAVE_FORM_DATA",
  payload: data,
});

export const setBeneficiaryBIC = (bic) => ({
  type: "SET_BENEFICIARY_BIC",
  payload: bic,
});

export const setIntermediaryBIC = (bic) => ({
  type: "SET_INTERMEDIARY_BIC",
  payload: bic,
});