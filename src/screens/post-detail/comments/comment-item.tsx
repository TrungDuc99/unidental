import React from 'react';

import Avatar from '@/components/avatar';
import { Text, View } from '@/ui';

type Props = any & { onPress?: () => void; navigate: any };

export const CommentItem = ({ id, comment, author, avatar }: Props) => {
  return (
    <View className="my-2  flex-row ">
      <Avatar image={avatar} />
      <View className="ml-2 rounded-xl bg-[#EFF1F5] p-2 px-3 ">
        <Text className="font-medium" variant="sm">
          {author}
        </Text>

        <Text ellipsizeMode="tail" className="  text-charcoal-700" variant="sm">
          {comment}
        </Text>
      </View>
    </View>
  );
};
