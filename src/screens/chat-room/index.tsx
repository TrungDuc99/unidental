import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import type { RouteProp } from '@/navigation/types';

import chatMessages from '../../SignalAssets/dummy-data/Chats';

export default function ChatRoomScreen() {
  const {
    params: { name },
  } = useRoute<RouteProp<'ChatRoom'>>();

  const navigation = useNavigation();

  navigation.setOptions({
    title: name ? name : '',
  });
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatMessages.messages}
        renderItem={({ item }: any) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
