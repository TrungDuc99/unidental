import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import styles from './styles';

interface ChatRoomItemProps {
  chatRoom: any;
  onPress?: (event: any) => void;
  userInfo: any;
}

const ChatRoomItem = (props: ChatRoomItemProps) => {
  const { chatRoom, onPress, userInfo } = props;
  const [groupName, setGroupName] = React.useState('');
  const user = chatRoom?.users?.filter(
    (user) => user?.id !== userInfo._id
  )?.[0];

  const { navigate } = useNavigation();

  const onPressNavigate = (event: any) => {
    navigate('ChatRoom', { id: chatRoom.id, name: user.name });
  };

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      onPress={onPressNavigate}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: user.imageUri,
          }}
          style={styles.image}
        />
        {chatRoom.newMessages && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
          </View>
        )}

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.text}>
              {`${
                chatRoom.messages[chatRoom.messages.length - 1]?.createdAt ?? ''
              }`}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>
            {`${
              chatRoom.messages[chatRoom.messages.length - 1]?.user.id ===
              userInfo._id
                ? 'Bạn: '
                : ''
            } ${
              chatRoom.messages[chatRoom.messages.length - 1]?.content ?? ''
            }`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatRoomItem;
