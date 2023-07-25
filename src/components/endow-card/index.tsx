import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-ui-lib';

import { Image, Text, View } from '@/ui';

type EndowItem = {
  id: string;
  image: string;
  title: string;
  decription: string;
  createdAt: any;
  content: string;
};

interface EndowCardProps {
  item: EndowItem;
}

const EndowCard = ({ item }: EndowCardProps) => {
  return (
    <Card key={item.id} style={styles.container}>
      <Image
        source={item.image}
        contentFit="cover"
        style={{
          width: '100%',
          height: 110,

          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />
      <View className="p-2">
        <View
          style={{
            height: 45,
          }}
        >
          <Text className=" font-semibold" variant="sm" numberOfLines={2}>
            {item.title}
          </Text>
        </View>

        <Text className="mb-1 " variant={'xs'} numberOfLines={2}>
          {item.decription}
        </Text>
      </View>
    </Card>
  );
};

export default EndowCard;

const styles = StyleSheet.create({
  container: {},
});
