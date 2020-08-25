export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD_DECK = 'ADD_CARD_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function addNewDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}
export function addCard (card) {
  return {
    type: ADD_CARD_DECK,
    card
  }
}

export function deleteDeck(deck) {
  return {
    type: DELETE_DECK,
    deck
  }
}