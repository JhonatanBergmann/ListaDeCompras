import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {heightPercentageToDP as h} from 'react-native-responsive-screen'

import Home from './screens/Home'
import Register from './screens/Register'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#b33a5d',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {fontSize: 25},
          headerTintColor: '#00adb5',
          headerLeftContainerStyle: {paddingLeft: 20},
        }}>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }} 
          />
        <Stack.Screen 
          name="Register"
          component={Register}
          options={{ title: 'Registrar', 
          headerTitleStyle: { fontSize: h('3%') } 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
