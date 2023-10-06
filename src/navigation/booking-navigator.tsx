import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HambergerMenu } from 'iconsax-react-native';
import * as React from 'react';

import { Spacing } from '@/configs';
import { useBooking } from '@/core';
import { Checkout } from '@/screens';
import { Booking } from '@/screens/booking';
import type { Appointment } from '@/screens/booking/appointment-item';
import BookingDetail from '@/screens/booking-detail';
import { NoAppointmentBooked } from '@/screens/no-appointment-booked';
import { colors, History, Text, TouchableOpacity, View } from '@/ui';

export type BookingStackParamList = {
  NoAppointmentBooked: undefined;
  Checkout: undefined;
  Booking: undefined;
  BookingDetail: {
    id: string;
    data: Appointment;
  };
  SearchFriend: undefined;
};

const Stack = createNativeStackNavigator<BookingStackParamList>();

export const BookingNavigator = () => {
  const bookingStatus = useBooking.use.bookingStatus();

  React.useEffect(() => {}, [bookingStatus]);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        animation: 'flip',
      }}
    >
      {/* {bookingStatus === 'completed' ? (
        <Stack.Screen
          options={{
            headerTitle: ChatsHeader,
          }}
          name="NoAppointmentBooked"
          component={NoAppointmentBooked}
        />
      ) : ( */}
      <Stack.Group>
        <>
          <Stack.Screen
            options={{
              headerTitle: ChatsHeader,
            }}
            name="NoAppointmentBooked"
            component={NoAppointmentBooked}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Booking"
            component={Booking}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookingDetail"
            component={BookingDetail}
            options={{
              headerShown: false,
            }}
          />
        </>
      </Stack.Group>
      {/* )} */}
    </Stack.Navigator>
  );
};

const ChatsHeader = () => {
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
      <HambergerMenu color={colors.primary[500]} />

      <Text variant="sm" className="font-bold ">
        Đặt lịch hẹn
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <History />
      </TouchableOpacity>
    </View>
  );
};
