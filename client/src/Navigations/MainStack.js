import React from 'react';
import * as Screens from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
export default function (Stack){
   return (
   <>
        <Stack.Screen name={navigationStrings.TAB_ROUTES} component={TabRoutes} />
    </>
    )
}