/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  * as Screens from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import imagePath from '../constants/imagePath';
import { Image } from 'react-native';
const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    console.log('image path',imagePath.icBack);
  return (
    <Tab.Navigator initialRouteName={navigationStrings.CHATS} screenOptions={{ headerShown: false }}>
      <Tab.Screen
  name={navigationStrings.STATUS}
  component={Screens.Status}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={imagePath.icStatus}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? 'blue' : 'black',
          resizeMode: 'contain',
        }}
      />
    ),
  }}
/>

<Tab.Screen
  name={navigationStrings.CALLS}
  component={Screens.Calls}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={imagePath.icCalls}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? 'blue' : 'black',
          resizeMode: 'contain',
        }}
      />
    ),
  }}
/>

<Tab.Screen
  name={navigationStrings.CAMERA}
  component={Screens.Camera}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={imagePath.icCamera}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? 'blue' : 'black',
          resizeMode: 'contain',
        }}
      />
    ),
  }}
/>

<Tab.Screen
  name={navigationStrings.CHATS}
  component={Screens.Chats}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={imagePath.icChats}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? 'blue' : 'black',
          resizeMode: 'contain',
        }}
      />
    ),
  }}
/>

<Tab.Screen
  name={navigationStrings.SETTINGS}
  component={Screens.Settings}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={imagePath.icSettings}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? 'blue' : 'black',
          resizeMode: 'contain',
        }}
      />
    ),
  }}
/>


    </Tab.Navigator>
  )
}

export default TabRoutes