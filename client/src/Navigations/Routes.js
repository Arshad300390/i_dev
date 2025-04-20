/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */

import React, {useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import { authUser } from '../redux/slices/authSlice'
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator()


const Routes = () => {



 const dispatch = useDispatch();
 useEffect(() => {
  //showAllAsyncStorageItems();
  //clearAsyncStorage();
  const checkUser = async () => {
    const id = await getUserId();
    if (id) {
      console.log('here', id)
      dispatch(authUser(id));
    }
  };

  checkUser();
}, [dispatch]);

//


const showAllAsyncStorageItems = async () => {
  try {
    // Get all keys in AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    
    // Get the values of the keys
    const items = await AsyncStorage.multiGet(keys);

    // Log the items in a readable format
    items.forEach(([key, value]) => {
      try {
        // Try to parse and log as JSON
        const parsedValue = JSON.parse(value);
        console.log(`🗝️ ${key}:`, parsedValue);
      } catch {
        // If not a JSON object, log the raw string value
        console.log(`🗝️ ${key}:`, value);
      }
    });
  } catch (e) {
    console.error('Error fetching AsyncStorage:', e);
  }
};

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  } catch (error) {
    console.error('Error clearing AsyncStorage', error);
  }
};
//
const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    if (userId !== null) {
      console.log('Retrieved user ID:', userId);
      return userId;
    } else {
      console.log('No user ID found in AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user ID:', error);
  }
};


const user = useSelector(state => state?.auth);
const id = user?.user?._id;
const verified = user?.user?.verified;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       {id && verified  ? <>{MainStack(Stack)}</>  : <>{AuthStack(Stack)}</> }

      </Stack.Navigator>
    </NavigationContainer>
  )
}
 
export default Routes