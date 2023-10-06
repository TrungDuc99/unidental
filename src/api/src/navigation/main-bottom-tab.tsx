import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ScanScreen from '@screens/scan-screen';
import {ProfileCircle, ReceiptItem, Scan, Setting2, SliderVertical1} from 'iconsax-react-native';
import React from 'react';

import {useAuth} from '@core';
import ProductsScreen from '@screens/products-screen';
import SettingsScreen from '@screens/settings-screen';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import AccountDrawer from './account-drawer';
import {RightDrawerScreen} from './oders-drawer-filter';
export type MainBottomTabParamList = {
  Orders: undefined;
  Scan: {
    scanType: number;
  };
  Statistic: undefined;
  Products: undefined;
  Settings: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<MainBottomTabParamList>();
const MainBottomTab = () => {
  const {summaryOrders} = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarLabelStyle: {
          fontFamily: FontFamily.Bold,
          fontSize: ScaleSize(10),
        },
        tabBarStyle: {
          paddingBottom: Spacing(4),
          paddingTop: Spacing(1),
          height: ScaleSize(70),
          backgroundColor: 'white',
          // position: 'absolute',
          // bottom: 35,
          // marginHorizontal: 20,
          borderRadius: 10,

          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarIconStyle: {
          marginBottom: ScaleSize(-5),
        },
      }}
    >
      <Tab.Screen
        name="Orders"
        component={RightDrawerScreen}
        options={{
          title: 'Đơn hàng',
          tabBarIcon: props => {
            return (
              <>
                <View
                  style={[
                    styles.bage,
                    {
                      height: 15,
                      width: 15,
                    },
                  ]}
                >
                  <Text style={styles.textBage}>
                    {summaryOrders?.total <= 99 ? summaryOrders?.total + '' : '99'}
                  </Text>
                </View>
                <ReceiptItem {...props} variant="Bulk" size={ScaleSize(24)} />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: 'Sản phẩm',
          tabBarIcon: props => {
            return (
              <>
                <SliderVertical1 {...props} variant="Bulk" size={ScaleSize(24)} />
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: 'Quét mã',

          tabBarIcon: props => {
            return (
              <View marginB-10>
                <Scan {...props} variant="Bulk" size={ScaleSize(30)} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
          tabBarIcon: props => {
            return <Setting2 {...props} variant="Bulk" size={ScaleSize(24)} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountDrawer}
        options={{
          title: 'Tài khoản',
          tabBarIcon: props => {
            return <ProfileCircle {...props} variant="Bulk" size={ScaleSize(24)} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTab;

const styles = StyleSheet.create({
  container: {},
  textBage: {
    color: 'white',
    textAlign: 'center',
    fontFamily: FontFamily.Medium,
    fontSize: ScaleSize(11),
  },
  bage: {
    position: 'absolute',
    left: 43,
    zIndex: 1,
    top: 3,
    borderRadius: 1000,
    backgroundColor: 'red',
  },
});
