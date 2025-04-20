/* eslint-disable react-hooks/exhaustive-deps */
import { TouchableOpacity, Text, FlatList, View } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import HeaderComponent from '../../Components/HeaderComponent'
import imagePath from '../../constants/imagePath'
import colors from '../../styles/colors'
import styles from './styles'
import navigationStrings from '../../constants/navigationStrings'
import RoundImage from '../../Components/RoundImage'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../redux/slices/userSlice'
import HorizontalLine from '../../Components/HorizontalLine'


const Users = ({ navigation }) => {

const dispatch = useDispatch();
  const [data, setData] = useState(null);

 useEffect(()=>{
  dispatch(getUsers())
  .unwrap()
  .then((res) => setData(res))
 },[])

  const onPressRight = () => {
    navigation.goBack();
  }
 const onPressItem = (item)=>{
navigation.navigate(navigationStrings.MESSAGE, {data: item})
 }
  const renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity
      onPress={()=>onPressItem(item)}
      activeOpacity={0.7}
      style={styles.headerStyle}>
        <RoundImage
          image={item.profileImage}
          size={40}
        />
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    )
  }, [data])

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={styles.listEmptyStyle}>
        <Text >No User Found</Text>
      </View>
    )
  }, [data])

  const listHeaderComponent = useCallback(() => {
    return (
      <View style={styles.headerStyle}>
        <RoundImage
          image={imagePath.icGroup}
          isStatic={true}
          size={40}
        />
        <Text style={styles.newGroupText}>New Group</Text>
      </View>
    )
  }, [data])
  return (
    <WrapperContainer containerStyle={{ paddingHorizontal: 0 }}>
      <HeaderComponent
        rightPressActive={false}
        centerText='New Chat'
        containerStyle={{ paddingHorizontal: 8 }}
        isLeftView={false}
        rightText='Cancel'
        rightTextStyle={{ color: colors.lightBlue }}
        onPressRight={onPressRight}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={()=> <HorizontalLine />}
      />

    </WrapperContainer>
  )
}

export default Users