/* eslint-disable max-lines-per-function */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import * as io from 'socket.io-client';
const host = 'http://localhost:3005';
export const recieveMessageRoute = `http://localhost:3002/api/messages/getmsg`;
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native';

import chatService from '@/api/chat';
import userService from '@/api/user';
import type { User } from '@/api/user/types';
import { selectUserInfo } from '@/feature/user/userSlice';
import { EmptyList } from '@/ui';

import FriendItem from '../search-friends/friend-item';
import ChatRoomItem from './chat-room-item';
const Chats = () => {
  const userInfo = useSelector(selectUserInfo);

  const renderItem: any = ({ item }: any) => {
    return <ChatRoomItem chatRoom={item} userInfo={userInfo} />;
  };
  const { navigate } = useNavigation();
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    if (searchValue !== '' && searchValue !== ' ') {
      setIsLoading(true);
      userService
        .searchUser(searchValue)
        .then((res) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setData([]);
          setIsLoading(false);
        });
    }
  }, [searchValue]);

  const [rooms, setRooms] = useState([]);
  const socketRef = React.useRef<any>();

  const getRooms = async () => {
    const res = await chatService.getChatRooms();
    setRooms(res);
  };
  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    socketRef.current = io.connect(host);

    socketRef.current.on('roomsList', (dataGot) => {
      getRooms();
      // setRooms(dataGot?.data);
    });
    // socketRef.current.on('sendDataServer', (dataGot) => {
    //   console.log(dataGot, 'sendDataServer');
    //   setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
    // });
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.post(recieveMessageRoute, {
        from: '123123',
        to: '456456',
      });
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      // ...
    }
    fetchData();
  }, []);

  const renderFriendItem = React.useCallback(
    ({ item }: { item: User }) => (
      <FriendItem
        {...item}
        onPress={() => {
          const users = [
            {
              name: userInfo.name,
              id: userInfo._id,
              imageUri: userInfo.avatarUrl,
            },
            {
              name: item.name,
              id: item._id,
              imageUri: item.avatarUrl,
            },
          ];
          // socketRef.current.emit('createRoom', item.name, users);
          socketRef.current.emit(
            'createRoom',
            item.name,
            users,
            (roomId: string) => {
              navigate('ChatRoom', { id: roomId, name: item.name });
            }
          );
        }}
      />
    ),
    []
  );
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderFriendItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
      />
      <FlatList
        style={{
          height: '100%',
        }}
        data={rooms}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chats;
