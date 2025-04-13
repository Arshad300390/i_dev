import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import HeaderComponent from '../../Components/HeaderComponent'
import HorizontalLine from '../../Components/HorizontalLine'
import imagePath from '../../constants/imagePath'
import colors from '../../styles/colors'
import fontFamily from '../../styles/fontFamily'
import navigationStrings from '../../constants/navigationStrings'
import RoundImage from '../../Components/RoundImage'
import TextInputComp from '../../Components/TextInputComp'
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../utils/permissions'
import { getUser, signUp } from '../../redux/slices/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const EditProfile = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  console.log('user in edit profile', user);

  const [state, setState] = useState({
    image: '',
    name: ''
  });

  const { image, name } = state;
  const { data } = route.params;
  console.log('data', data);

  const updateState = (data) => setState((prevState) => ({ ...prevState, ...data }));

  useEffect(() => {
    if (user?.users) {
      console.log('user updated in useEffect:', user.users);
      navigation.navigate(navigationStrings.OTP_VERIFICATION, {
        data: user.users,
        user: user.users,
      });
    }
  }, [user?.users, navigation]); // Make sure navigation works after user data is available

  const leftCustomView = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imagePath.icBack} />
      </TouchableOpacity>
    );
  };

  const selectPhoto = async () => {
    const hasPermission = await androidCameraPermission();
    if (!hasPermission) return;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then(res => {
        console.log(res.path);
        updateState({ image: res.path });
      })
      .catch(err => {
        console.log('Image Picker Error:', err);
      });
  };

  const onDone = async () => {
    let apiData = {
      ...state,
      ...data,
    };

    try {
      // Dispatch signUp action
      await dispatch(signUp(apiData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperContainer containerStyle={{ paddingHorizontal: 0 }}>
      <HeaderComponent
        centerText="Edit your profile"
        containerStyle={{ paddingHorizontal: 8 }}
        leftCustomView={leftCustomView}
        isLeftView={true}
        onPressRight={onDone}
        rightTextStyle={{ color: name.length > 3 ? colors.lightBlue : colors.grey }}
        rightPressActive={name.length < 3}
      />
      <View style={{ margin: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RoundImage onPress={selectPhoto} image={image} />
          <Text style={styles.descStyle}>Enter your name and an optional profile picture</Text>
        </View>
      </View>

      <HorizontalLine />
      <TextInputComp
        placeholder="Your name"
        onChangeText={text => updateState({ name: text })}
      />
      <HorizontalLine />
    </WrapperContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   descStyle: {
//     fontSize: 12,
//     fontFamily: fontFamily.blackFont,
//     flex: 1,
//     marginLeft: 16,
//     color: colors.grey,
//   },
// })

export default EditProfile;
