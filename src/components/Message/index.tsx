import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/ui';

interface MessageProps {
  message: any;
  myID: string;
}

const Message = (props: MessageProps) => {
  const { message, myID } = props;

  const isMe = message.user.id === myID ? true : false;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isMe ? 'white' : 'black',
          },
        ]}
      >
        {message?.content}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  text: {},
  leftContainer: {
    backgroundColor: '#F0F0F0',
    marginRight: 'auto',
    marginLeft: 10,
  },
  rightContainer: {
    backgroundColor: colors.primary[500],
    marginRight: 10,
    marginLeft: 'auto',
  },
});
