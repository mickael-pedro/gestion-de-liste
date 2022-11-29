import { CONSTANTS } from "../actions";

const getIDLocalStorage = (type) => {
  const savedID = localStorage.getItem(type);
  if (savedID) {
    return JSON.parse(savedID);
  } else {
    return 0;
  }
};

let listID = getIDLocalStorage("listID");
let cardID = getIDLocalStorage("cardID");

const getListLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    return JSON.parse(savedTodos);
  } else {
    return [];
  }
};

const initialState = getListLocalStorage();

const listsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: listID
            };
            listID += 1;
            localStorage.setItem("listID", JSON.stringify(listID));
            return [...state, newList];

        case CONSTANTS.DELETE_LIST:
            return state.filter(list => list.id !== action.payload.listID);

        case CONSTANTS.UPDATE_LIST:
          const newTitle = state.map(list => {
            if (list.id === action.payload.listID) {
              return {
                ...list,
                title: action.payload.title,
              };
            } else {
              return list;
            }
          });

          return newTitle;

        case CONSTANTS.ADD_CARD:
            const newCard = {
              text: action.payload.text,
              status: false,
              id: cardID
            };
            cardID += 1;
            localStorage.setItem("cardID", JSON.stringify(cardID));
        
            console.log("action received", action);
        
            const newState = state.map(list => {
              if (list.id === action.payload.listID) {
                return {
                  ...list,
                  cards: [...list.cards, newCard]
                };
              } else {
                return list;
              }
            });
        
            return newState;

        case CONSTANTS.DELETE_CARD:                    
          const delState = state.map(list => {
            if (list.id === action.payload.listID) {
              return {
                ...list,
                cards: list.cards.filter(card => card.id !== action.payload.id)
              };
            } else {
              return list;
            }
          });
      
          return delState;

        case CONSTANTS.UPDATE_CARD:
          const newText = state.map(list => {
            if (list.id === action.payload.listID) {
              return {
                ...list,
                cards: list.cards.map(card => {
                  if (card.id === action.payload.id) {
                    return {
                      ...card,
                      text: action.payload.text
                    };
                  } else {
                    return card;
                  }
                })
              };
            } else {
              return list;
            }
          });
      
          return newText;
          
        case CONSTANTS.SWITCH_STATUS_CARD:
          const newStatus = state.map(list => {
            if (list.id === action.payload.listID) {
              return {
                ...list,
                cards: list.cards.map(card => {
                  if (card.id === action.payload.id) {
                    return {
                      ...card,
                      status: !card.status
                    };
                  } else {
                    return card;
                  }
                })
              };
            } else {
              return list;
            }
          });
      
          return newStatus;

        default:
            return state;
    };
};

export default listsReducer;