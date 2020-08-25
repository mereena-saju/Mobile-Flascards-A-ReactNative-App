import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple, white, gray, red } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { CommonActions } from '@react-navigation/native'

class Quiz extends Component {
    state = {
        quesNo: 0,
        showAnswer: false,
        correct: 0,
        incorrect: 0
    }
    submitAnswer = (answer) => {
        const { quesNo } = this.state
        if (answer === 'true') {
            this.setState({ correct: this.state.correct + 1 })
        }
        else {
            this.setState({ incorrect: this.state.incorrect + 1 })
        }
        this.setState({ quesNo: this.state.quesNo + 1, showAnswer: false })
    }
    viewAnswer = () => (
        this.setState({ showAnswer: !this.state.showAnswer })
    );
    resetQuiz = () => {
        this.setState({
            quesNo: 0,
            showAnswer: false,
            correct: 0,
            incorrect: 0
        })
    }
    returnBack = () => {
        this.props.navigation.dispatch(CommonActions.goBack())
    }
    render() {
        const { quesNo, showAnswer } = this.state;
        const decks = this.props.decks;
        const number = this.state.quesNo + 1;
        const deck = this.props.route.params.id;
        if (decks[deck].questions.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.subtext}> There are no questions in this card,add some questions!
                  </Text>
                        <TouchableOpacity  onPress={this.returnBack} >
                            <Text style={[styles.btn, {color: white, backgroundColor: purple }]}>Return Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else if (quesNo === decks[deck].questions.length) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.subtext}>You got {this.state.correct} correct out of {decks[deck].questions.length}</Text>
                        <TouchableOpacity onPress={this.resetQuiz} >
                            <Text style={[styles.btn, { color: white, backgroundColor: 'red' }]}>Try Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.returnBack} >
                            <Text style={[styles.btn, { color: white, backgroundColor: purple }]}>Return Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {/*  <View style={styles.card}> */}
                <Text style={styles.subtext}>Question {number} / {decks[deck].questions.length} :</Text>
                <Text style={styles.text}>{decks[deck].questions[quesNo].question}</Text>
                <View style={styles.card}>
                    {
                        !showAnswer ? <TouchableOpacity onPress={this.viewAnswer}><Text style={[styles.btn, { borderWidth: 3 }]}>Show Answer</Text></TouchableOpacity>
                            : <Text style={styles.subtext}>{decks[deck].questions[quesNo].answer}</Text>
                    }
                </View>
                <Text style={styles.subtext}> Know the Answer? </Text>
                <TouchableOpacity onPress={() => this.submitAnswer('true')} >
                    <Text style={[styles.btn, { color: white, backgroundColor: 'green', borderColor: 'green' }]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.submitAnswer('false')} >
                    <Text style={[styles.btn, { color: white, backgroundColor: 'red', borderColor: 'red' }]}>No</Text>
                </TouchableOpacity>
                {/* </View> */}
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
        margin: 20,
        height: 250,
        padding: 15,
        borderRadius: 10,
        alignSelf: 'stretch',
        backgroundColor: gray
    },
    btn: {
        borderRadius: 5,
        padding: 10,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        margin: 15,
    },
    text: {
        fontWeight: "bold",
        fontSize: 32,
        padding: 10
    },
    subtext: {
        fontSize: 20,
        fontWeight: "bold",
    }
})
function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);