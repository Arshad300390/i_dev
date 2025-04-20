/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import imagePath from '../../constants/imagePath'
const Settings = () => {
  const [products, setProducts] = useState([
    {title: 'Post 1', isBlocked: false},
    {title: 'Post 1', isBlocked: true},
    {title: 'Post 1', isBlocked: false},
    {title: 'Post 1', isBlocked: true},
    {title: 'Post 1', isBlocked: false},
  ])

  const renderItem = ({ item, index }) => {
    return (
      <View>
      {!item.isBlocked
      ? <View style={styles.itemView} >
      </View>
    : <View style={{
      width: '95%',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      alignSelf: 'center',
      marginBottom: 10,
      backgroundColor: '#afafaf',
    }} >
      <Text style={{color: 'red'}}>I M blocked</Text>
    </View>}  
    
      </View>
    );
  }
  return (
    <View style={styles.contaienr}>
      <View style={{ marginTop: 50 }}>
        <FlatList
          data={products}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    width: '95%',
    minHeight: 100,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',

  }
})
export default Settings