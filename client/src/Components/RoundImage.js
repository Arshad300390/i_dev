/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'

const RoundImage = ({
    image = "",
    size = 80,
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                height: size,
                width: size,
                borderRadius: size / 2,
                backgroundColor: colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.grey,
            }}>
            {!!image ? 
            <Image
            style={{
                height: size,
                width: size,
                borderRadius: size / 2,
            }}
            source={{uri: image}}
            />
                : <Text style={styles.textStyle}>add photo</Text>}
        </TouchableOpacity>
    )
}

export default RoundImage

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 12,
        fontFamily: fontFamily.bold,
        color: colors.lightBlue,
    },
})