import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HambergerMenu, SearchNormal } from 'iconsax-react-native';
import * as React from 'react';

import { Spacing } from '@/configs';
import Chats from '@/screens/chats';
import { colors, Text, TouchableOpacity, View } from '@/ui';

export type ChatsStackParamList = {
  Chats: undefined;
  ChatRoom: { id: string; name: string };
  SearchFriend: undefined;
};

const Stack = createNativeStackNavigator<ChatsStackParamList>();

export const ChatsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        options={{
          headerTitle: ChatsHeader,
        }}
        component={Chats}
      />
    </Stack.Navigator>
  );
};

const ChatsHeader = () => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '94%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: Spacing(10),
      }}
    >
      <View>
        <HambergerMenu color={colors.primary[500]} />
      </View>

      <Text variant="sm" className="font-bold ">
        Đoạn chat
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigate('SearchFriend');
        }}
      >
        <SearchNormal color={colors.primary[500]} />
      </TouchableOpacity>
    </View>
  );
};
