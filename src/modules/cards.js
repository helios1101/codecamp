import request from "superagent";

const initialState = {
  deckId: "",
  playerCards: [],
  numberOfPlayers: 10
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_DECK":
      return {
        ...state,
        deckId: action.payload
      };
      break;
    case "DRAW_CARD":
      return {
        ...state,
        playerCards: action.payload
      };
    default:
      return state;
  }
};

const drawCards = id =>
  request.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);

export const drawCard = id => {
  return dispatch => {
    drawCards(id).then(response => {
      dispatch({
        type: "DRAW_CARD",
        payload: response.body.cards
      });
    });
  };
};

export const getNewDeck = () => {
  return dispatch => {
    request
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(response => {
        dispatch({
          type: "NEW_DECK",
          payload: response.body.deck_id
        });
      });
  };
};
