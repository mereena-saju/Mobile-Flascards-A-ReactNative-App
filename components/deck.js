import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import { deleteDeck } from '../actions'
import { getAllDecks } from '../utils/api'
import { purple, white, gray, red } from '../utils/colors'
import { removeDeck } from '../utils/api'


class Deck extends Component {
    handleDelete = () => {
        const deck = this.props.route.params.id;
        removeDeck(deck);
        this.props.dispatch(deleteDeck(deck));
        this.props.navigation.navigate('DeckList');
    }
    render() {
        const deck = this.props.route.params.id;
        const { decks } = this.props;
        
        //AFTER DELETION
        if(!decks[deck])
          return null;

        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.text}>{decks[deck].title}</Text>
                    <Text style={[{ margin: 5 }, styles.subtext]}>{decks[deck].questions.length} Cards</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard', { id: deck })}>
                        <Text style={[{ color: purple, borderColor: purple,borderWidth: 3 }, styles.btn]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', { id: deck })}>
                        <Text style={[{ backgroundColor: purple, color: white }, styles.btn]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleDelete}>
                        <Text style={[{ backgroundColor: red, color: white }, styles.btn]}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 300,
        padding:10,
        borderRadius: 10,
        alignSelf: 'stretch',
        backgroundColor: gray
    },
    btn: {
        borderRadius: 5,
        padding: 5,
        width: 200,
        height: 40,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold",
        margin: 10,

    },
    text: {
        fontWeight: "bold",
        fontSize: 32
    },
    subtext: {
        fontSize: 18
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Deck)
