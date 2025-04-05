/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {Fragment, useState} from 'react'
import imagePath from '../constants/imagePath'
import colors from '../styles/colors'
import Modal from 'react-native-modal'
import HeaderComponent from './HeaderComponent'
import countries from './countries'
import HorizontalLine from './HorizontalLine'
import fontFamily from '../styles/fontFamily'

const CountryPicker = ({
    fetchCountry = () => {},
    value = "",
}) => {
    const [data, setData] = useState(countries)
    const [showModal, setShowModal] = useState(false);

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={{ marginHorizontal: 16,}}
            activeOpacity={0.5}
            onPress={()=>onSelectCountry(item)}
            >
                <Text>{item?.name} ({item?.dialCode})</Text>
            </TouchableOpacity>
        )
    }
const onSelectCountry = (item) => {
fetchCountry(item);
setShowModal(false);
}

  return (
    <Fragment>
    <TouchableOpacity 
    activeOpacity={0.5}
    style={styles.container}
    onPress={() => setShowModal(true)}
    >
        <Text style={styles.valueStyle}>{value}</Text>
        <Image source={imagePath.icForward} />
      </TouchableOpacity>
      <Modal isVisible={showModal}>
        <View style={{flex:1, backgroundColor: colors.white}}>
          <HeaderComponent
          centerText='Select your country'
          rightText='x '
          onPressRight={() => setShowModal(false)}
          />
          <View style={{ maxHeight: '90%'}}>
          <FlatList 
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={()=> <HorizontalLine lineStyle={{marginVertical: 8}} />}
          />
          </View>
        </View>
      </Modal>
      </Fragment>
  )
}

export default CountryPicker

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    padding: 8,
    paddingHorizontal: 16,
},
valueStyle: {
    color: colors.lightBlue,
    fontSize: 16,
    fontFamily: fontFamily.bold,
}
})