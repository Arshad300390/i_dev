import React from 'react';
import * as Screens from '../Screens';
import navigationStrings from '../constants/navigationStrings';
export default function (Stack){
   return (
   <>
        <Stack.Screen name={navigationStrings.TERMS_CONDITION} component={Screens.TermsCondition}/>
        <Stack.Screen name={navigationStrings.PHONE_NUMBER} component={Screens.PhoneNumber}/>
        <Stack.Screen name={navigationStrings.EDIT_PROFILE} component={Screens.EditProfile}/>
        <Stack.Screen name={navigationStrings.OTP_VERIFICATION} component={Screens.OtpVerification}/>
    </>
    )
}