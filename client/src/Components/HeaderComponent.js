import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'

const HeaderComponent = ({
    centerText = "",
    rightText = "Done",
    leftCustomView = () => { },
    isLeftView = false,
    containerStyle = {},
    rightTextStyle = {},
    onPressRight = () => { },
}) => {
    return (
        <View style={{ ...styles.container, ...containerStyle }} >
            {isLeftView ? leftCustomView() : <View />}
            <Text style={styles.centerTextStyle}>
                {centerText}
            </Text>
            <TouchableOpacity onPress={onPressRight}>
                <Text style={{...styles.rightTextStyle, ...rightTextStyle}}>{rightText}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        paddingBottom: 12,
    },
    centerTextStyle: {
        color: colors.black,
        fontFamily: fontFamily.bold,
        fontSize: 24,
    },
    rightTextStyle: {
        color: colors.gray,
        fontFamily: fontFamily.regular,
        fontSize: 18,
    },
})

export default HeaderComponent