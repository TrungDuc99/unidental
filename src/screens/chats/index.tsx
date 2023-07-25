import * as React from 'react';
import { FlatList, View } from 'react-native';

import ChatRoomsData from '../../SignalAssets/dummy-data/ChatRooms';
import ChatRoomItem from './chat-room-item';
const Chats = () => {
  const renderItem: any = ({ item }: any) => {
    return <ChatRoomItem chatRoom={item} />;
  };
  return (
    <View>
      <FlatList
        data={ChatRoomsData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chats;
