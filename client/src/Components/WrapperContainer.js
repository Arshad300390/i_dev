import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../styles/colors'

const WrapperContainer = ({
    statusBarColor = colors.white,
    barstyle = 'dark-content',
    containerStyle = {},
    children,
}) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
        <StatusBar backgroundColor={statusBarColor} barstyle={barstyle}/>
      <SafeAreaView style={{flex: 1}}>
        {children}
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
},
});
export default WrapperContainer