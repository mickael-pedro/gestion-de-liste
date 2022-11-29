import { CONSTANTS } from "../actions"

export const addList = title => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    };
};

export const deleteList = (listID) => {
    return {
      type: CONSTANTS.DELETE_LIST,
      payload: { listID }
    };
};

export const updateList = (listID, title) => {
    return {
      type: CONSTANTS.UPDATE_LIST,
      payload: { listID, title }
    };
};