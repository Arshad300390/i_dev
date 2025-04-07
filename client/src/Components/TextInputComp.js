/* eslint-disable jsx-quotes */
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { Fragment } from 'react'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'

const TextInputComp = ({
    placeholder = "",
    inputStyle = {},
    onChangeText = () => {},
    ...props

}) => {
  return (
    <Fragment>
      <TextInput
          placeholder={placeholder}
          style={{...styles.inputStyle, ...inputStyle}}
          onChangeText={onChangeText}
          {...props}
        />
    </Fragment>
  )
}

export default TextInputComp

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: 12,
    borderBottomColor: colors.gray,
    paddingHorizontal: 12,
    fontFamily: fontFamily.regular,
  }
})