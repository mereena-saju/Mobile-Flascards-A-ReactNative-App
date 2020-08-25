import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
//import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
 import { Notifications } from 'expo'
 
const NOTIFICATION_DATA = 'flashcards_notifications'

function createNotification() {
  return {
    title: 'Revise By Flashcards!',
    body: "👋  Don't forget to add your card for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_DATA)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(10);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_DATA, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_DATA)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}