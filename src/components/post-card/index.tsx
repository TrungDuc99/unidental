import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-ui-lib';

import { Image } from '@/ui';

type PostItem = {
  id: string;
  image: string;
  title: string;
  decription: string;
  createdAt: any;
  content: string;
};

interface PostCardProps {
  item: PostItem;
}

const PostCard = ({ item }: PostCardProps) => {
  return (
    <Card key={item.id} style={styles.container}>
      <Image
        source={item.image}
        style={{
          width: 100,
          height: 80,
          borderRadius: 4,
        }}
      />
    </Card>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {},
});
