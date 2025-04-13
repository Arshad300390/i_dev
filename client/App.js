import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Routes from './src/Navigations/Routes'
import {Provider} from 'react-redux'
import {store, persistor} from './src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <View style={styles.container}>
        <Routes />
      </View>
      </PersistGate>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default App