export const DETAILS_MODAL_OPEN = 'DETAILS_MODAL_OPEN';
export const INGREDIENTS_MODAL_OPEN = 'INGREDIENTS_MODAL_OPEN';


export const modalStatus = (status) => ({
  type:  DETAILS_MODAL_OPEN,
  payload: status
});

export const ingredientModalStatus = (status) => ({
  type:  INGREDIENTS_MODAL_OPEN,
  payload: status
});
