import { AsyncStorage } from 'react-native'
import { isEmpty } from 'rxjs/operators';

const FLASHCARDS_DATA_KEY = "flashcards_decks";

const startData = {
    Music: {
        title: 'Music',
        questions: [
            {
                question: 'Despacito is sung By',
                answer: 'Louis Fonsi'
            },
            {
                question: 'Justin Bieber is Football Player or Singer',
                answer: 'Singer'
            }
        ]
    },
    Movie: {
        title: 'Movie',
        questions: [
            {
                question: 'Captain America character is played by?',
                answer: 'Chris Evans'
            }
        ]
    }
};

export const giveData = () => {
    return {
        startData
    }
}

export const getAllDecks = () => {
    return AsyncStorage.getItem(FLASHCARDS_DATA_KEY).then((res) => {
        if (res === null || isEmpty(res)) {
            AsyncStorage.setItem(FLASHCARDS_DATA_KEY, JSON.stringify(startData));
            return startData;
        } else {
            return JSON.parse(res);
        }
    })
}

export const saveNewDeck = (title) => {
    return AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export const saveCardToDeck = (title, card) => {
    AsyncStorage.getItem(FLASHCARDS_DATA_KEY).then(res => JSON.parse(res))
        .then(res => {
            res[title].questions.push(card);
            AsyncStorage.setItem(FLASHCARDS_DATA_KEY, JSON.stringify(res));
            return res;
        })

}

export function removeDeck(title) {
    return AsyncStorage.getItem(FLASHCARDS_DATA_KEY)
        .then(res => JSON.parse(res))
        .then((res) => {
            res[title] = undefined;
            delete res[title];
            AsyncStorage.setItem(FLASHCARDS_DATA_KEY, JSON.stringify(res))
        })
}