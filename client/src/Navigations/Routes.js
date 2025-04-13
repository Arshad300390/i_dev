/* eslint-disable no-extra-boolean-cast */

import React, {useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import { getUser } from '../redux/slices/userSlice'
import {useSelector, useDispatch} from 'react-redux';


const Stack = createNativeStackNavigator()


const Routes = () => {

 const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getUser());
},[dispatch])
const userId = useSelector(state=> state?.user?.users?._id)
console.log('hi',userId);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       {userId  ? <>{MainStack(Stack)}</>  : <>{AuthStack(Stack)}</> }

      </Stack.Navigator>
    </NavigationContainer>
  )
}
 
export default Routes