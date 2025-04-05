import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../styles/colors'


const HorizontalLine = ({
    lineStyle = {},
}) => {
  return (
    <View style={{...styles.lineStyle, ...lineStyle}} />
  )
}
const styles = StyleSheet.create({
    lineStyle: {
        height: 1,
        backgroundColor: 'gray',
        borderBottomWidth: 0.5,
        opacity: 0.1,
    },
})
export default HorizontalLine