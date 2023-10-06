/* eslint-disable max-lines-per-function */

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight2 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { addToCart } from '@/feature/cart/cartSlice';
import { Button, Text, View } from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';
import { renderBackdrop } from '@/ui/core/bottom-sheet/backdrop';
import ButtonBase from '@/ui/core/button-base';
import ModalBase from '@/ui/core/modal-base';
import colors from '@/ui/theme/colors';

import DatePickerList from './date-picker-list';
import TimePicker from './time-picker';

export const Checkout = () => {
  const [first, setFirst] = useState(false);
  const [dateCheckIn, setDateCheckIn] = useState<any>();
  const { navigate } = useNavigation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const optionsRef = React.useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const open = React.useCallback(() => optionsRef.current?.present(), []);
  const close = React.useCallback(() => optionsRef.current?.dismiss(), []);
  return (
    <View className="flex-1">
      <BackTopBar title="Đặt lịch" />
      <ScrollView>
        <DatePickerList
          onSelectedDate={(date) => {
            setDateCheckIn({ ...dateCheckIn, ...date });
          }}
        />
        <TimePicker
          onSelectedTime={(time) => {
            setDateCheckIn({ ...dateCheckIn, ...time });
          }}
        />
        <View className="mx-5 mt-5  ">
          <ButtonBase
            borderRadius="medium"
            label="Tiếp tục"
            onPress={open}
            iconRight={{
              name: ArrowRight2,
              size: 17,
            }}
          />
        </View>
      </ScrollView>
      <BottomSheetModal
        ref={optionsRef}
        index={0}
        snapPoints={['40%']}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: isDark ? colors.white : colors.charcoal[800],
        }}
        backgroundStyle={{
          backgroundColor: isDark ? colors.charcoal[950] : colors.white,
        }}
      >
        <View className=" item-center flex justify-center px-4">
          <Text variant="xl" className="my-4 text-center font-bold">
            Xác nhận thông tin
          </Text>
          <Text variant="md" className="mb-5 text-center font-semibold">
            Đỗ Trung Đức{'\n '}
            <Text variant="sm" className="font-bold">
              Tái khám{'\n'}
            </Text>
            <Text variant="sm" className="font-bold">
              {`lúc ${dateCheckIn?.time ?? ''} ngày ${
                dateCheckIn?.fullDate ?? ''
              }`}
            </Text>
          </Text>
          <Button
            label="Tiếp tục"
            size="large"
            onPress={() => {
              dispatch(
                addToCart({
                  ProductId: '1',
                  ProductName: 'Tái khám răng',
                  ProductSeName: 'SeName',
                  Quantity: 1,

                  AttributeInfo: 'string',
                  Picture: 'PictureModels',
                  Id: 1,
                  CustomProperties: 'CustomProperties',
                })
              );
              close();
              navigate('Booking');
            }}
          />
          <Button
            size="large"
            label="Trở về"
            type="primary"
            onPress={close}
            variant="outline"
          />
        </View>
      </BottomSheetModal>
      <ModalBase
        onCancel={() => setFirst(false)}
        visible={first}
        content={
          <View className="flex justify-center">
            <Text variant="xl" className="mb-4 text-center font-bold">
              Xác nhận thông tin
            </Text>
            <Text variant="sm" className="font-semibold">
              Đỗ Trung Đức{' '}
              <Text variant="sm" className="font-bold">
                Tái khám
              </Text>
              <Text variant="sm" className="font-bold">
                Lúc 11h3
              </Text>
            </Text>
          </View>
        }
      />
    </View>
  );
};
