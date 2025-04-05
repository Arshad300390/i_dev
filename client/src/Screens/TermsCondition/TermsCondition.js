/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */

import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import imagePath from '../../constants/imagePath';
import styles from './styles'
import Colors from '../../styles/colors';
import navigationStrings from '../../constants/navigationStrings';
import WrapperContainer from '../../Components/WrapperContainer';


const TermsCondition = ({ navigation }) => {
    return (
        <WrapperContainer containerStyle={{ alignItems: 'center' }}>
            <Image
                resizeMode='contain'
                style={styles.logoStyle}
                source={imagePath.logo}
            />
            <Text style={styles.headingStyle}>Welcome to WatsApp</Text>
            <Text style={styles.descStyle}>Read our <Text style={{ color: Colors.lightBlue }}>Privacy Policy.</Text> Tap "Agree & Continue" to the <Text style={{ color: Colors.lightBlue }}> Terms of Services.</Text> </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(navigationStrings.PHONE_NUMBER)}>
                <Text style={styles.agreeContinue}>Agree & Continue</Text>
            </TouchableOpacity>
        </WrapperContainer>
    )
}
export default TermsCondition