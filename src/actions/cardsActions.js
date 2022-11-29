import { CONSTANTS } from "../actions"

export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID }
    };
};

export const deleteCard = (id, listID) => {
    return {
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listID }
    };
};

export const updateCard = (id, listID, text) => {
    return {
      type: CONSTANTS.UPDATE_CARD,
      payload: { id, listID, text }
    };
};

export const switchStatusCard = (id, listID) => {
  return {
    type: CONSTANTS.SWITCH_STATUS_CARD,
    payload: { id, listID }
  };
};