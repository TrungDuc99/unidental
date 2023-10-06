import * as React from 'react';
import { StyleSheet } from 'react-native';

import type { User } from '@/api/user/types';
import Avatar from '@/components/avatar';
import { Text, TouchableOpacity } from '@/ui';

// type Props = Post & { onPress?: () => void };

// export const Card = ({ title, body, onPress = () => {} }: Props) => {

type Props = User & { onPress?: () => void };

const FriendItem = ({ avatarUrl, name, onPress = () => {} }: Props) => {
  return (
    <TouchableOpacity
      className="my-2 flex-row items-center"
      onPress={() => {
        onPress();
      }}
      style={styles.container}
    >
      <Avatar image={avatarUrl} />
      <Text className="ml-2 font-medium">{name}</Text>
    </TouchableOpacity>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  container: {},
});
