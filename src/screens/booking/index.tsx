import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

// import { TabController } from 'react-native-ui-lib';
import { View } from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';
import TabController from '@/ui/core/tab-controller';

import AppointmentItem from './appointment-item';
import SkeletonLoading from './skeleton-loading';

const data: any = [
  {
    id: '#12311',

    serviceName: 'string1',
    checkoutDate: 'string',
    status: 1,
    doctorName: 'string',
    ratingDoctors: 'number',
  },
  {
    id: '2',
    serviceName: 'string2',
    checkoutDate: 'string',
    status: 2,
    doctorName: 'string',
    ratingDoctors: 'number',
  },
  {
    id: '3',
    serviceName: 'string3',
    checkoutDate: 'string',
    status: 3,
    doctorName: 'string4',
    ratingDoctors: 'number',
  },
  // ...more items
];
const data2: any = [
  {
    id: '1',
    serviceName: 'string1',
    checkoutDate: 'string',
    status: 2,
    doctorName: 'string',
    ratingDoctors: 'number',
  },
  {
    id: '2',
    serviceName: 'string2',
    checkoutDate: 'string',
    status: 2,
    doctorName: 'string',
    ratingDoctors: 'number',
  },
  {
    id: '3',
    serviceName: 'string3',
    checkoutDate: 'string',
    status: 2,
    doctorName: 'string4',
    ratingDoctors: 'number',
  },
  // ...more items
];
export const Booking = () => {
  const [tabCurrent, setTabCurrent] = useState<number>(1);
  const [loading, setloading] = useState(false);
  const { navigate } = useNavigation();
  const setDefaultLoading = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };
  useEffect(() => {
    setDefaultLoading();
  }, []);

  const renderItem = ({ item }: any) => (
    <View key={item.id}>
      <AppointmentItem
        onPress={(data) => {
          navigate('BookingDetail', {
            id: data.id,
            data: data,
          });
        }}
        item={item}
      />
    </View>
  );
  return (
    <View className="flex-1">
      <BackTopBar title="Đặt lịch" />
      <View className="m-2 flex flex-1">
        <TabController
          tabs={[
            {
              label: 'Active',
              value: '1',
            },
            {
              label: 'Success',
              value: '2',
            },
            {
              label: 'Cancelled',
              value: '3',
            },
          ]}
          onPressTab={(value) => {
            setTabCurrent(Number(value.value));
            setDefaultLoading();
          }}
        />
        <View className="mb-3" />

        {loading ? (
          <SkeletonLoading />
        ) : (
          <FlatList
            data={tabCurrent === 1 ? data : data2}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};
