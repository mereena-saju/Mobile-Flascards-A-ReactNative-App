import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { giveData } from '../utils/api'
import { receiveDecks } from '../actions'
import { getAllDecks } from '../utils/api'
import { purple, gray } from '../utils/colors'

class DeckList extends Component {
    componentDidMount() {
        getAllDecks()
            .then(decks => {
                this.props.receiveTotalDecks(decks)
            })
    }
    render() {
        const { decks } = this.props;
        return (
            <ScrollView style={styles.container}>
                {decks && Object.keys(decks).map((deckName) => {
                    const { title, questions } = decks[deckName]
                    return (
                        <View key={deckName} style={styles.card}>
                            <Text style={styles.text}>{title}</Text>
                            <Text style={[{ margin: 5 }, styles.subtext]}>{questions.length} Cards</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { id: deckName })}>
                                <Text style={styles.btn}>View Deck</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 10
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 200,
        borderRadius: 10,
        alignSelf: 'stretch',
        backgroundColor: gray
    },
    btn: {
        backgroundColor: purple,
        borderRadius: 5,
        color: 'white',
        padding: 5,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold",
        height: 45
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
        decks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveTotalDecks: (decks) => { dispatch(receiveDecks(decks)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);