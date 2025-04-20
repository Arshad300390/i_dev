/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import RoundImage from '../../Components/RoundImage';
import fontFamily from '../../styles/fontFamily';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';


export default function Message({ route, navigation }) {
    const user = useSelector(state => state?.auth);
    const profileImage = user?.user?.profileImage;
    const id = user?.user?._id;
    console.log(profileImage);
    const [messages, setMessages] = useState([]);
    console.log('route', route);
    const { data } = route.params;

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: data?._id,
                    name: data.name,
                    avatar: data.profileImage,
                },
                // image: 'https://img.freepik.com/free-photo/handsome-sensitive-red-head-man-smiling_23-2149509820.jpg',
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const renderActions = useCallback(() => {
        return (
            <TouchableOpacity
                style={{ marginLeft: 8, marginBottom: 8 }}
            >
                <Image source={imagePath.icPlus} />
            </TouchableOpacity>
        )
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={styles.flexView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                            <Image source={imagePath.icBack} />
                        </TouchableOpacity>
                        <View style={styles.nameView}>
                            <RoundImage
                                image={data?.profileImage}
                                size={40}
                            />
                            <Text style={styles.nameTextStyle}>{data?.name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image
                                source={imagePath.icVideo}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 12 }}>
                            <Image
                                source={imagePath.icCalls}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                </SafeAreaView>
                <ImageBackground source={imagePath.icBigLight} style={{ flex: 1 }}>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: id,
                            name: user.user.name,
                            avatar: profileImage,
                        }}
                        showUserAvatar={true}
                        textInputStyle={{
                            backgroundColor: colors.white,
                            borderRadius: 20,
                            paddingHorizontal: 12,
                            marginTop: 6,
                            borderWidth: 0.5,
                            borderColor: colors.grey,
                            paddingTop:8,
                        }}
                        renderInputToolbar={props => {
                            return (
                                <InputToolbar
                                    containerStyle={{
                                        backgroundColor: '#f6f6f6',
                                    }}
                                    {...props}
                                />
                            )
                        }}
                        renderActions={renderActions}
                    />
                </ImageBackground>
            
        </View>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom:8,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.grey,
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    nameTextStyle: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        marginLeft: 8
    }
})