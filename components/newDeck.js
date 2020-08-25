import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { saveNewDeck } from '../utils/api'
import { addNewDeck } from '../actions'
import { connect } from 'react-redux'
import { purple, gray,white } from '../utils/colors'


class NewDeck extends Component {

    state = {
        title: ''
    }
    submitDeck = () => {
        const { title } = this.state;
        saveNewDeck(title);
        this.props.dispatch(addNewDeck(title))
        this.props.navigation.navigate('Deck', { id: title })
        this.setState({ title: '' })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Add Deck Title</Text>
                <TextInput onChangeText={(text) => this.setState({ title: text })}
                    value={this.state.title}
                    style={styles.textbox}
                    placeholder=' Enter Title'>
                </TextInput>
                <TouchableOpacity disabled={this.state.title === ''} onPress={this.submitDeck}>
                    <Text style={this.state.title === '' ? styles.dbtn : styles.btn}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    dbtn: {
        backgroundColor: gray,
        borderRadius: 5,
        color: 'grey',
        padding: 10,
        width: 150,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold",
        height: 45
    },
    btn: {
        backgroundColor: purple,
        borderRadius: 5,
        color: 'white',
        padding: 10,
        width: 150,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold",
        height: 45
    },
    text: {
        fontWeight: "bold",
        fontSize: 32,
        color: purple
    },
    subtext: {
        fontSize: 18
    },
    textbox: {
        margin: 45,
        borderRadius: 8,
        borderColor: purple,
        borderRadius: 8,
        height: 55,
        width: 300,
        margin: 22,
        padding: 7,
        borderWidth: 1,
        backgroundColor:white
    }
})

export default connect()(NewDeck);