/* eslint-disable max-lines-per-function */

import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as io from 'socket.io-client';
const host = 'http://localhost:3002';
import Lottie from 'lottie-react-native';

import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import { ScaleSize } from '@/configs';
import { selectUserInfo } from '@/feature/user/userSlice';
import type { RouteProp } from '@/navigation/types';
import { View } from '@/ui';
export default function ChatRoomScreen() {
  const {
    params: { name, id },
  } = useRoute<RouteProp<'ChatRoom'>>();
  const socketRef = useRef<any>();
  const [chatMessages, setChatMessages] = useState<any>([]);
  const userInfo = useSelector(selectUserInfo);
  const navigation = useNavigation();
  const [userComposing, setUserComposing] = useState<any>();
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useLayoutEffect(() => {
    socketRef.current = io.connect(host);
    navigation.setOptions({ title: name });
    socketRef.current.emit('findRoom', id);
    socketRef.current.on('foundRoom', (roomChats: any) => {
      setChatMessages(roomChats);
    });
    // socketRef.current.on('composing', (data: any) => {
    //   setUserComposing(data);
    // });
  }, []);

  useEffect(() => {
    socketRef.current.on('roomMessage', (newMessage: any) => {
      if (newMessage.room_id === id) {
        setChatMessages((prevMessages: any) => [...prevMessages, newMessage]);
      }
    });
  }, []);

  const sendMessage = (message: string) => {
    setUserComposing(null);
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;
    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socketRef.current.emit('newMessage', {
      message,
      room_id: id,
      user: {
        name: userInfo?.name,
        id: userInfo._id,
      },
      timestamp: { hour, mins },
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatMessages}
        renderItem={({ item }: any) => {
          return <Message myID={userInfo._id} message={item} />;
        }}
      />
      {userComposing && userComposing.user.id !== userInfo._id && (
        <View style={styles.messageContainer}>
          <Lottie
            style={{ height: ScaleSize(40) }}
            source={require('@/assets/animation/composing.json')}
            autoPlay
            loop
          />
        </View>
      )}

      <MessageInput
        onChangeTextValue={(text) => {
          socketRef.current.emit('sendComposing', {
            text,
            id,
            user: {
              name: userInfo?.name ?? '',
              id: userInfo._id,
            },
          });
        }}
        onSendMessage={(message) => {
          sendMessage(message);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  messageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    width: 45,
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
  },
});
