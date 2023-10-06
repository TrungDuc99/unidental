import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { EmptyList, View } from '@/ui';

import { CommentItem } from './comment-item';

interface CommentsProps {}
type Comment = {
  id: number;
  comment: string;
  author: string;
  avatar: string;
};
const comments = [
  {
    id: 1,
    comment: 'Great post!',
    author: 'John',
    avatar:
      'https://toigingiuvedep.vn/wp-content/uploads/2021/01/anh-avatar-dep-nam-chat-ngau.jpg',
  },
  {
    id: 2,
    comment: 'I totally agree.',
    author: 'Jane',
    avatar:
      'https://toigingiuvedep.vn/wp-content/uploads/2023/03/hinh-anh-avatar-dep-nu-ngau.jpg',
  },
  {
    id: 3,
    comment: 'Nice job!',
    author: 'Mike',
    avatar:
      'https://toigingiuvedep.vn/wp-content/uploads/2022/11/avatar-dep-nu-cho-con-gai.jpg',
  },

  {
    id: 4,
    comment:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident omnis perferendis unde dolorem voluptatibus consequatur nam veritatis repellendus eaque, dolor libero recusandae nesciunt quis laborum ratione incidunt quam fuga atque?',
    author: 'Mike',
    avatar:
      'https://toigingiuvedep.vn/wp-content/uploads/2022/11/avatar-dep-nu-cho-con-gai.jpg',
  },
];
const Comments = (props: CommentsProps) => {
  const { navigate } = useNavigation();
  const renderItem = React.useCallback(
    ({ item }: { item: Comment }) => (
      <View style={{ marginRight: 38 }}>
        <CommentItem {...item} onPress={() => {}} />
      </View>
    ),
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <FlashList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 13,
  },
});
