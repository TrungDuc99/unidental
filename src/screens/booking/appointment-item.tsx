/* eslint-disable max-lines-per-function */

import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Image, Text, View } from '@/ui';
import Divider from '@/ui/core/drivider';

export type Appointment = {
  id: string;
  serviceName: string;
  checkoutDate: string;
  status: number;
  doctorName: string;
  ratingDoctors: number;
};
interface AppointmentItemProps {
  item: Appointment;
  onPress: (data: Appointment) => void;
}

const AppointmentItem = ({ item, onPress }: AppointmentItemProps) => {
  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between">
        <Text className="font-semibold text-primary-600" variant="xs">
          #123456
        </Text>
        <View
          className={`rounded-md ${
            item.status === 1
              ? 'bg-[#D9EBFF]'
              : item.status === 2
              ? 'bg-[#E1F2E4]'
              : 'bg-[#FFEED9]'
          }  px-2 py-1`}
        >
          <Text
            className={`text-[10px] font-semibold  ${
              item.status === 1
                ? 'text-primary-600'
                : item.status === 2
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
      {item.status === 1 && (
        <Button
          type={'error'}
          variant="outline"
          size="small"
          label="Cancel"
          onPress={() => {
            onPress(item);
          }}
        />
      )}
    </View>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    padding: 10,
    paddingBottom: 5,
    marginBottom: 10,
  },
});
