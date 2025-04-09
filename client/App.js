import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Routes from './src/Navigations/Routes'
import {Provider} from 'react-redux'
import {store} from './src/redux/store/store'
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
      </View>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default App