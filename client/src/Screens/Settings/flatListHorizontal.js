/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const FlatListHorizontal = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    console.log(products);
  }, [products]);

  const getData = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
      })
  }

  const renderItem = ({ item, index }) => {
    return <View style={styles.itemView}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.nameView}>
        <Text>{item.title.length > 30
          ? item.title.substring(0, 30) + '...'
          : item.title}</Text>

        <Text>{item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description}</Text>
        <Text style={styles.price}>{'$' + item.price}</Text>
      </View>
    </View>
  }
  return (
    <View style={styles.contaienr}>
      <View style={{marginTop: 50}}>
        <FlatList
          data={products}
          horizontal
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
    width: 200,
    height: 230,
    backgroundColor: '#fff',
    marginLeft: 10,
    alignSelf: 'center',
    elevation: 6,
    borderRadius: 10,
    marginBottom: 10,
  },
  productImage: {
    height: 100,
    width: 100,
    alignSelf: 'center'

  },
  nameView: {
    paddingLeft: 20,
    paddingRight: 10,
    width: '100%',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
    marginTop: 10,
  }
})
export default FlatListHorizontal