import {Customer} from '@models/hop-dong';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {fetchUserDetail} from '@redux/actions/user-action';

import ScanedDetailScreen from '@screens/scaned-detail-screen/infodetail-scaned';

import React, {useLayoutEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {useDispatch} from 'react-redux';
import MainBottomTab from './main-bottom-tab';
import OrderDetailScreen from '@screens/order-detail-screen';

export type MainStackParamList = {
  MainBottomTab: undefined;
  Voucher: undefined;
  ScanLogin: undefined;
  VoucherDetail: {
    voucherId: number | string;
    showDecription?: boolean;
  };
  ViewImage: {
    file: any;
    productCode?: string;
    idScreen?: string;
  };
  Scaner: {
    scanType: number; // 1 is default at bottom navigate main and 2 is scan custom screen;
  };
  ScanedDetail: {
    data: any;
    email: string;
  };
  OrderDetail: {
    data: any;
  };
  Notifications: undefined;
  NotificationDetail: {
    id: number | string;
  };
  CollectPoints: {
    code?: any;
    file?: any;
    routeName: 'ScanCode' | 'ImportCode';
  };
  DetailCustomer: {
    // data: KhachHang;
    data: Customer;
  };
  EditStoreInfo: undefined;
  AddUser: undefined;
  Chats: undefined;
  ChatRoom: {id: string; name: string};
};
interface ParamsNotification {
  screen: string;
  id: number | string;
}
const Stack = createStackNavigator<MainStackParamList>();
const MainStackNavigation = () => {
  const dispatchRedux = useDispatch();
  dispatchRedux(fetchUserDetail());
  const navigation = useNavigation<any>();

  const navigateToScreen = (notificationData: ParamsNotification) => {
    switch (notificationData.screen) {
      case 'OrderDetail':
        navigation.navigate('OrderDetail', notificationData.id);
        return;
      default:
        return;
    }
  };
  useLayoutEffect(() => {
    OneSignal.setNotificationOpenedHandler(notificationResponse => {
      const {notification} = notificationResponse;
      if (notification) {
        const {additionalData = null}: any = notification;
        if (additionalData) {
          navigateToScreen(additionalData);
        }
      }
    });
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
      <Stack.Screen name="ScanedDetail" component={ScanedDetailScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
