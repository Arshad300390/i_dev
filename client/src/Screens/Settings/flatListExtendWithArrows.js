/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import imagePath from '../../constants/imagePath'
const FlatListExtendWithArrows  = () => {
  const [products, setProducts] = useState([
    { data: [1, 1, 1, 1, 1, 1, 1, 1], isSelected: false },
    { data: [1, 1, 1, 1, 1, 1, 1, 1], isSelected: false },
  ])
const select = (index)=>{
let tempData = products;
tempData.map((item,ind)=>{
  if(index == ind){
  item.isSelected = !item.isSelected;
  }else{
    item.isSelected=false;
  }
});
let temp = []
tempData.map(item=>{
temp.push(item);
});
setProducts(temp);
}
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.itemView} onPress={()=>{ select(index)}}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'red' }}>{'item' + (index + 1)}</Text>
       {item.isSelected && (
           <FlatList
           data={item.data}
           renderItem={({ item, index }) => {
             return <View style={{margin: 10}}>
               <Text style={{fontSize: 13, fontWeight: '700', color: 'blue'}}>{'sub item' + (index+1)}</Text>
             </View>
           }}
         />
       )}
       {item.isSelected ? (
        <Image source={imagePath.up}
        style={{ width: 24, height: 24, position: 'absolute', top:20, right:20 }} />
       ) : (<Image source={imagePath.down}
        style={{ width: 24, height: 24, position: 'absolute', top:20, right:20 }} />) }
     
      </TouchableOpacity>
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
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',

  }
})
export default FlatListExtendWithArrows 