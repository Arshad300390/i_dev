/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { TouchableOpacity, Text, StyleSheet, FlatList, View, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import HeaderComponent from '../../Components/HeaderComponent'
import imagePath from '../../constants/imagePath'
import colors from '../../styles/colors'
import fontFamily from '../../styles/fontFamily'
import styles from './styles'
import navigationStrings from '../../constants/navigationStrings'

const Chats = ({navigation}) => {

  const [data, setData] = useState([]);

  const leftCustomView = () => {
    return <TouchableOpacity>
      {data.length > 0 ? <Text>Edit</Text> : <View />}
      <Text style={styles.headingStyle}>Chat</Text>
    </TouchableOpacity>
  }
  const onPressRight = () => {
    navigation.navigate(navigationStrings.USERS);
  }

  const renderItem = useCallback(({ item, index }) => {
    return (
      <Text>
        Flat item
      </Text>
    )
  }, [data])

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={styles.listEmptyStyle}>
        <View style={{}}>
          <Text style={styles.commStyle}>Tap on
            <Image source={imagePath.icEdit} />
            <Text style={{ ...styles.commStyle, color: colors.black }}>in the top right corner to start a new chat.</Text>

          </Text>

        </View>
        <Text style={{ ...styles.commStyle, color: colors.grey, marginTop: 16 }}>You can chat with contact who have installed this app and signup on their phone</Text>
      </View>
    )
  }, [data])
  return (
    <WrapperContainer containerStyle={{ paddingHorizontal: 0 }}>
      <HeaderComponent
        rightPressActive={false}
        containerStyle={{ paddingHorizontal: 8 }}
        isLeftView={true}
        //  leftCustomView={leftCustomView}
        rightImage={imagePath.icEdit}
        onPressRight={onPressRight}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
      />

    </WrapperContainer>
  )
}

export default Chats