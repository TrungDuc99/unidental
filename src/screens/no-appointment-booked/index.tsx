import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useBooking } from '@/core';
import { Image, View } from '@/ui';
import ButtonLinear from '@/ui/core/button-linear';

export const NoAppointmentBooked = () => {
  const { navigate } = useNavigation();
  const setBookingState = useBooking.use.setBookingStatus();

  return (
    <View className="flex flex-1 items-center justify-center">
      <Image
        style={{
          width: '100%',
          height: 350,
        }}
        source={require('@/assets/images/appointment_booked.jpg')}
      />
      <View className=" mt-10 w-2/3">
        <ButtonLinear
          label="Booking Now"
          onPress={() => {
            navigate('Checkout');
            setBookingState('confirmed');
          }}
        />
      </View>
    </View>
  );
};
