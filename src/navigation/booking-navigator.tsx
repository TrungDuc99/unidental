import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HambergerMenu } from 'iconsax-react-native';
import * as React from 'react';

import { Booking } from '@/screens';
import { AddVideoCall, colors, Text, TouchableOpacity, View } from '@/ui';

export type BookingStackParamList = {
  Booking: undefined;
};

const Stack = createNativeStackNavigator<BookingStackParamList>();

export const BookingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Booking"
        options={{
          headerTitle: ChatsHeader,
        }}
        component={Booking}
      />
    </Stack.Navigator>
  );
};

const ChatsHeader = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <HambergerMenu color={colors.primary[500]} />

      <Text variant="sm" className="font-bold ">
        Đoạn chat
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <AddVideoCall color={colors.primary[500]} />
      </TouchableOpacity>
    </View>
  );
};
