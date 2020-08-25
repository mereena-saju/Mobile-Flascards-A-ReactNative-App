import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import { saveCardToDeck } from '../utils/api'
import { CommonActions } from '@react-navigation/native';
import { purple, white, gray, red } from '../utils/colors'
import { addCard } from '../actions'
import { clearLocalNotification,setLocalNotification } from '../utils/notification'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    handleSubmit = (deck) => {
        const { question, answer } = this.state
        this.props.dispatch(addCard({ question, answer, deck }))
        saveCardToDeck(deck, { question, answer })
        this.setState({ question: '', answer: '' })
        this.props.navigation.dispatch(CommonActions.goBack())
        clearLocalNotification()
        .then(setLocalNotification)
    }
    render() {
        const { question, answer } = this.state
        const deckId = this.props.route.params.id;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.text}>Add Question</Text>
                        <TextInput style={styles.textbox}
                            onChangeText={(question) => this.setState({ question })}
                            value={this.state.question}
                            placeholder='Enter Question'
                        ></TextInput>

                        <Text style={styles.text}>Add Answer</Text>
                        <TextInput style={styles.textbox}
                            onChangeText={(answer) => this.setState({ answer })}
                            value={this.state.answer}
                            placeholder='Your Answer'
                        ></TextInput>

                        {/* <Text style={styles.text}>Correct or Incorrect</Text> */}
                        {/* <TextInput style={styles.textbox}
                            onChangeText={(corrAnswer) => this.setState({ corrAnswer })}
                            value={this.state.corrAnswer}
                            placeholder='Correct Answer'
                        ></TextInput> */}

                        {question === '' || answer === ''
                            ? (
                                <Text style={styles.subtext}>Fill all the Inputs</Text>
                            ) : (
                                <TouchableOpacity onPress={() => this.handleSubmit(deckId)}>
                                    <Text style={styles.btn}>Submit</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 200,
        padding: 20,
        borderRadius: 10,
        alignSelf: 'stretch',
        backgroundColor: white
    },
    btn: {
        backgroundColor: purple,
        color: white,
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
        fontSize: 32,
        color: purple
    },
    subtext: {
        fontSize: 18
    },
    textbox: {
        borderRadius: 6,
        height: 35,
        width: 250,
        margin: 22,
        padding: 7,
        borderWidth: 1
    }
})


export default connect()(AddCard);