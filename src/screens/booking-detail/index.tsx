/* eslint-disable max-lines-per-function */

import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import type { RouteProp } from '@/navigation/types';
import { Button, colors, Image, Text, View } from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';
import Divider from '@/ui/core/drivider';

const BookingDetail = () => {
  const { params } = useRoute<RouteProp<'BookingDetail'>>();
  const { data, id } = params;
  return (
    <View style={{ flex: 1 }}>
      <BackTopBar title={`${params.id}`} />
      <View className="m-6 flex flex-1">
        <View className="flex flex-row justify-between">
          <Text className="font-semibold text-primary-600" variant="xs">
            #123456
          </Text>
          <View
            className={`rounded-md ${
              data.status === 1
                ? 'bg-[#D9EBFF]'
                : data.status === 2
                ? 'bg-[#E1F2E4]'
                : 'bg-[#FFEED9]'
            }  px-2 py-1`}
          >
            <Text
              className={`text-[10px] font-semibold  ${
                data.status === 1
                  ? 'text-primary-600'
                  : data.status === 2
                  ? 'text-success-500'
                  : 'text-warning-500'
              } `}
              variant="xs"
            >
              Accepted
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text variant="sm" className="font-semibold">
              asdasd
            </Text>
            <Text variant="xs" className="font-medium text-[#8B8A8F]">
              asdqweqwe
            </Text>
          </View>
          <Text variant="md" className="font-semibold">
            99đ
          </Text>
        </View>
        <Divider orientation="horizontal" />
        <View className="mb-3 flex flex-row items-center justify-between">
          <View>
            <Text variant="sm" className="font-semibold">
              asdasd
            </Text>
            <Text variant="xs" className="font-medium text-[#8B8A8F]">
              asdqweqwe
            </Text>
          </View>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('@/assets/images/doctor.png')}
          />
        </View>
        <View
          style={{
            borderWidth: 0.8,
            marginTop: 10,
            padding: 10,
            borderRadius: 12,
            borderColor: 'red',
            backgroundColor: colors.danger[50],
            borderStyle: 'dashed',
          }}
        >
          <Text className="font-medium" variant="sm">
            Cancellation Policy
          </Text>
          <Text className="text-charcoal-600" variant="xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            repellat, dolor odio cupiditate nulla iusto vel eligendi suscipit
            eos. Exercitationem reprehenderit rerum repellat nam? Enim, odit?
          </Text>
          {/* Nội dung bên trong */}
        </View>

        {/* Thanh Toán */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text variant="xl" className="my-3 font-semibold">
            Order Summary
          </Text>
          <View className="flex-row justify-between">
            <Text variant="md" className="my-1 font-medium text-charcoal-500">
              Subtotal
            </Text>
            <Text variant="md" className="font-medium text-black">
              1.000.000vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="md" className="font-medium text-charcoal-500">
              Subtotal
            </Text>
            <Text variant="md" className="font-medium text-black">
              1.200.000vnd
            </Text>
          </View>
          <View className="my-5 flex-row justify-between">
            <Text variant="md" className="font-medium text-charcoal-800">
              Subtotal
            </Text>
            <Text variant="md" className="font-bold text-black">
              1.200.000vnd
            </Text>
          </View>

          <Button size="large" label="Hủy đặt lịch" variant="outline" />
        </View>
      </View>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
