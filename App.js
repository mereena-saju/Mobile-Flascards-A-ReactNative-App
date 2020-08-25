import React, { Component } from 'react';
import { View, Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { purple, white } from './utils/colors'
import Constants from 'expo-constants';
import { FontAwesome,FontAwesome5, Ionicons } from '@expo/vector-icons';

import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DeckList from './components/deckList';
import NewDeck from './components/newDeck';
import Deck from './components/deck';
import AddCard from './components/addCard';
import Quiz from './components/quiz';
import { setLocalNotification } from './utils/notification'


function DeckStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'DeckList') {
            iconName = 'clipboard-list';
          }
          else if (route.name === 'NewDeck') {
            iconName = 'folder-plus';
          }
          return <FontAwesome5 name={iconName} size={30} color={purple} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: purple,
        inactiveTintColor: 'gray',
        tabBarVisible: false,
        style: {
          height: 60,
          padding: 3
        }
      }}>
      <Tab.Screen name="DeckList" component={DeckList} options={{ tabBarLabel: 'Decks' }} />
      <Tab.Screen name="NewDeck" component={NewDeck} options={{ tabBarLabel: 'Add Deck' }} />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route){
  const routeName= getFocusedRouteNameFromRoute(route) ? getFocusedRouteNameFromRoute(route) : 'DeckList';
  switch(routeName){
    case 'DeckList':
      return 'Deck List';
    case 'NewDeck':
      return 'New Deck';
  }
}
const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
        headerMode="float"
        animation="fade"
      >
      <Stack.Screen name="Decks" component={MyTabs}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleAlign: 'center'
        })} 
      />
      <Stack.Screen name="Deck" component={Deck}
        options={() => ({
          title: 'Deck View',
          headerTitleAlign: 'center'
        })} 
      />
      <Stack.Screen name="AddCard" component={AddCard}
        options={() => ({
          title: 'Add Card',
          headerTitleAlign: 'center'
        })} 
      />
       <Stack.Screen name="Quiz" component={Quiz}
        options={() => ({
          title: 'Start Quiz',
          headerTitleAlign: 'center'
        })} 
      />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
class App extends Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DeckStatusBar backgroundColor={purple} barStyle="light-content" />
          <MyStack />
        </View>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#95d5db'
  }
})

export default App

