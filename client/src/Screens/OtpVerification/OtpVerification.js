/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useEffect} from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import HeaderComponent from '../../Components/HeaderComponent'
import navigationStrings from '../../constants/navigationStrings'
import imagePath from '../../constants/imagePath'
import HorizontalLine from '../../Components/HorizontalLine'
import styles from './styles'
import OtpInputs from 'react-native-otp-inputs';
import colors from '../../styles/colors'
import { getUser } from '../../redux/slices/userSlice'
import {useSelector, useDispatch} from 'react-redux';

const OtpVerification = ({ navigation, route }) => {

  const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getUser());
},[dispatch])
console.log(useSelector(state=> state ));

  const { data } = route?.params
  console.log('in otp screen', data);



  const leftCustomView = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}>
        <Image source={imagePath.icBack} />
      </TouchableOpacity>
    )
  }
  return (
    <WrapperContainer
      containerStyle={{ paddingHorizontal: 0 }}
    >
      <HeaderComponent
        centerText={`${data?.selectedCountry?.dialCode} ${data?.phoneNumber}`}
        containerStyle={{ paddingHorizontal: 8 }}
        leftCustomView={leftCustomView}
        isLeftView={true}
        isRight={false}
      />
      <Text style={{ ...styles.descStyle, marginVertical: 24 }}>We have sent you an SMS with a code the number above.</Text>
      <Text style={styles.descStyle}>to complete your phone number verification, please enter the 6 digit activation code</Text>
      <View style={{ marginHorizontal: 16 }}>
        <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={6}
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 42 }}
          inputStyles={styles.inputStyles}
        />
        <View style={{ marginTop: 52 }}>
          <Text style={styles.bottomText}> Resend code in</Text>
        </View>
      </View>
    </WrapperContainer>
  )
}

export default OtpVerification