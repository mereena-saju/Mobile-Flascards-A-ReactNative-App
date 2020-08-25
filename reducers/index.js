import { ADD_DECK, ADD_CARD_DECK, RECEIVE_DECKS, DELETE_DECK } from "../actions";

function deck(state = {}, action) {
    switch (action.type) {
        case ADD_DECK: {
            const newDeck = {
                [action.deck]: {
                    title: action.deck,
                    questions: []
                }
            }
            return {
                ...state,
                ...newDeck
            }
        }

        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case ADD_CARD_DECK: {
            const { question, answer, deck } = action.card;
            return {
                ...state,
                [deck]: {
                    ...state[deck],
                    questions: [...state[deck].questions, { question, answer }]
                }
            }
        }
        case DELETE_DECK: {
            const newState = Object.assign({}, state);
            delete newState[action.deck];
            return newState;
        }
        default:
            return state
    }
}

export default deck