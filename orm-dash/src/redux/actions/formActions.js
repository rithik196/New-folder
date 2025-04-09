export const updateTabData = (tabKey, data) => ({
  type: 'UPDATE_TAB_DATA',
  payload: { tabKey, data }
});

export const changeTab = (tabIndex) => ({
  type: 'CHANGE_TAB',
  payload: tabIndex
});

export const resetForm = () => ({ type: 'RESET_FORM' });

export const setBeneficiaryBIC = (bic) => ({
  type: "SET_BENEFICIARY_BIC",
  payload: bic,
});

export const setIntermediaryBIC = (bic) => ({
  type: "SET_INTERMEDIARY_BIC",
  payload: bic,
});