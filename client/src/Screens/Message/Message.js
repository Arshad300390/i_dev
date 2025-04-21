/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch } from 'react-redux';
import { sendMessage, getMessages } from '../../redux/slices/messageSlice';
import socketService from '../../utils/socketService';
export default function Message({ route, navigation }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state?.auth);
    const profileImage = user?.user?.profileImage;
    const id = user?.user?._id;
    console.log(profileImage);
    const [messages, setMessages] = useState([]);
    const { data } = route.params;

    const getUserAvatar = (senderId) => {
        // You could store avatars in Redux or fetch them dynamically
        if (senderId === id) {
          return profileImage; // current user's avatar
        }
        return data?.profileImage || 'https://randomuser.me/api/portraits/men/77.jpg'; // fallback or another user's avatar
      };

      useEffect(() => {
        console.log("🔍 Fetching messages between:", user.user._id, data._id);
    
        dispatch(getMessages({
            senderId: user.user._id,
            receiverId: data._id,
        }))
        .unwrap()
        .then((fetchedMessages) => {
            console.log('Fetched Messages:', fetchedMessages);
            
            const currentUserId = id; // IMPORTANT: Set this properly
            
            const formattedMessages = fetchedMessages.map((message) => {
                const isCurrentUser = message.senderId?.toString() === currentUserId;
                
                return {
                    _id: message._id?.toString(),
                    text: message.text,
                    createdAt: message.timestamp,
                    user: {
                        _id: message?.user?._id.toString(),
                        name: message.senderName,
                        avatar: getUserAvatar(message?.user?._id),
                    },
                    // Add position control for Gifted Chat
                    //position: isCurrentUser ? 'right' : 'left',
                };
            });
            console.log('in useeffect',formattedMessages)
            setMessages(formattedMessages.reverse());
        })
        
        
        .catch((err) => {
            console.error('Failed to fetch chat history:', err);
        });
    
        socketService.initializeSocket();
    
        const handleNewMessage = (newMessage) => {
            console.log("📩 New message received via socket:", newMessage);
    
            const isRelevant =
                (newMessage.senderId === data._id && newMessage.receiverId === id) ||
                (newMessage.senderId === id && newMessage.receiverId === data._id);
    
            if (isRelevant) {
                setMessages((previousMessages) =>
                    GiftedChat.append(previousMessages, [{
                        _id: newMessage._id.toString(),
                        text: newMessage.message,
                        createdAt: new Date(newMessage.timestamp),
                        user: {
                            _id: newMessage.senderId,
                            name: newMessage.senderName,
                            avatar: getUserAvatar(newMessage.senderId),
                        },
                    }])
                );
            }
        };
    
        socketService.on("newMessage", handleNewMessage);
    
        return () => {
            socketService.removeListener("newMessage");
        };
    }, [user.user._id, data._id]);  // Add these as dependencies
    

        const onSend = useCallback((messages = []) => {
            const newMessage = messages[0];
            // setMessages(previousMessages =>
            //     GiftedChat.append(previousMessages, messages),
            // )
            // Dispatch to backend
            dispatch(sendMessage({
                senderId: user.user._id,
                receiverId: data._id,
                message: newMessage.text, // ✅ backend expects "message", not "text"
            }));
        }, [dispatch, user.user._id, data._id]);

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
                        messages={messages || []} 
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: id?.toString(),
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
                            paddingTop: 8,
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
            paddingBottom: 8,
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