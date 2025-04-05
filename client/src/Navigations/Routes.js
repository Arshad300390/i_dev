
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
const Stack = createNativeStackNavigator()


const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       { false ? <>{MainStack(Stack)}</>  : <>{AuthStack(Stack)}</> }

      </Stack.Navigator>
    </NavigationContainer>
  )
}
 
export default Routes