import { DETAILS_MODAL_OPEN, INGREDIENTS_MODAL_OPEN } from '../actions/modal';


const initialState = {
  isDetailsModalOpen: false,
  isIngredientModalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILS_MODAL_OPEN: {
      return {
        ...state,
        isDetailsModalOpen: action.payload,
      };
    }
    case INGREDIENTS_MODAL_OPEN: {
      return {
        ...state,
        isIngredientModalOpen: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
