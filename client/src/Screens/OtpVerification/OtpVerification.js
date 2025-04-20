/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComponent from '../../Components/HeaderComponent';
import navigationStrings from '../../constants/navigationStrings';
import imagePath from '../../constants/imagePath';
import HorizontalLine from '../../Components/HorizontalLine';
import styles from './styles';
import OtpInputs from 'react-native-otp-inputs';
import colors from '../../styles/colors';
import { otpVerify } from '../../redux/slices/authSlice';
import { deleteUser } from '../../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerification = ({ navigation, route }) => { 
  const dispatch = useDispatch();
  
  useEffect(() => {
    // You can add any necessary effect here if needed
  }, [dispatch]);

  const auth = useSelector(state => state.auth);
  console.log('user before otp verify', auth.user?._id);

  const { data, user } = route.params;
  console.log('user from params in otp screen', user);
  console.log('in otp screen user id', data._id);

  const leftCustomView = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imagePath.icBack} />
      </TouchableOpacity>
    );
  };

  const handleChange = async (value) => {
    if (value.length === 6) { // Ensure exactly 6 digits are entered
      const res = await dispatch(otpVerify({
        otp: value,
        user_id: data?._id,
      })).unwrap();

      if (res) {
        const existingUserId = await AsyncStorage.getItem('user_id');

      // If a value exists under 'user_id', remove it
      if (existingUserId) {
        await AsyncStorage.removeItem('user_id');
      }

      // Now set the new user_id
      await AsyncStorage.setItem('user_id', data?._id);
        console.log('res after send otp verify', res);
        console.log("user after otp verify", auth.user);
      } else {
        console.log('OTP verification failed, deleting user');
        const res = await dispatch(deleteUser(data?._id));
        console.log('after not verify, deleted user', res);
      }
    }
  };

  return (
    <WrapperContainer containerStyle={{ paddingHorizontal: 0 }}>
      <HeaderComponent
        centerText={`${data?.selectedCountry?.dialCode} ${data?.phoneNumber}`}
        containerStyle={{ paddingHorizontal: 8 }}
        leftCustomView={leftCustomView}
        isLeftView={true}
        isRight={false}
      />
      <Text style={{ ...styles.descStyle, marginVertical: 24 }}>
        We have sent you an SMS with a code to the number above.
      </Text>
      <Text style={styles.descStyle}>
        To complete your phone number verification, please enter the 6-digit activation code.
      </Text>
      <View style={{ marginHorizontal: 16 }}>
        <OtpInputs
          handleChange={handleChange}
          numberOfInputs={6}
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 42 }}
          inputStyles={styles.inputStyles}
        />
        <View style={{ marginTop: 52 }}>
          <Text style={styles.bottomText}>Resend code in</Text>
        </View>
      </View>
      <View>
      <Text style={styles.bottomText}>{auth.user?._id}</Text>
      </View>
    </WrapperContainer>
  );
};

export default OtpVerification;
