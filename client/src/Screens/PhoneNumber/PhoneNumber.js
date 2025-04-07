/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComponent from '../../Components/HeaderComponent';
import HorizontalLine from '../../Components/HorizontalLine';
import styles from './styles';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import CountryPicker from '../../Components/CountryPicker';
import navigationStrings from '../../constants/navigationStrings';
styles
const PhoneNumber = ({ navigation }) => {

  // const [selectedCountry, setSelectedCountry] = useState({
  //   "name": "Pakistan",
  //   "dialCode": "+92",
  //   "isoCode": "PK",
  //   "flag": "https://cdn.kcak11.com/CountryFlags/countries/pk.svg"
  // });

  const [state, setState] = useState({
    selectedCountry: {
      "name": "Pakistan",
      "dialCode": "+92",
      "isoCode": "PK",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/pk.svg"
    },
    phoneNumber: '',
  })

  const { selectedCountry, phoneNumber } = state

  const updateState = (data) => setState((state) => ({ ...state, ...data }))

  const fetchCountry = (data) => {
    updateState({ selectedCountry: data })
  }

  const leftCustomView = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imagePath.icBack} />
      </TouchableOpacity>
    )
  }

  const onDone = () => {
    navigation.navigate(navigationStrings.EDIT_PROFILE,{data: state})
  }

  return (
    <WrapperContainer
      containerStyle={{ paddingHorizontal: 0 }}
    >
      <HeaderComponent
        centerText='Enter your phone number'
        containerStyle={{ paddingHorizontal: 8 }}
        leftCustomView={leftCustomView}
        isLeftView={true}
        onPressRight={onDone}
        rightTextStyle={{ color: phoneNumber.length > 8 ? colors.lightBlue : colors.grey}}
        rightPressActive={phoneNumber.length < 8 }
      />
      <Text style={styles.descStyle}>
        Watsapp will send an SMS message to verify your phone number.
      </Text>
      <HorizontalLine />
      <CountryPicker
        fetchCountry={fetchCountry}
        value={selectedCountry?.name}
      />
      <View style={styles.phoneInputStyle}>
        <Text style={styles.dialCodeStyle}>{selectedCountry?.dialCode}</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder='Enter your phone number'
            keyboardType='number-pad'
            style={styles.textInputStyle}
            onChangeText={ (text)=>updateState({phoneNumber: text})}
          />
        </View>
      </View>

    </WrapperContainer>
  );
}

export default PhoneNumber