import {TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize} from '@configs';
import {useAuth} from '@core';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OrdersScreen from '@screens/oders-screen';
import * as React from 'react';
import {Platform} from 'react-native';

import {Badge, Text, View} from 'react-native-ui-lib';

const RightDrawerContent = (props: any) => {
  const {summaryOrders} = useAuth();
  console.log(props);

  return (
    <View flex padding-15 style={{paddingTop: Platform.OS === 'ios' ? 50 : 15}}>
      <Text
        marginB-15
        style={{
          fontFamily: FontFamily.Bold,
          fontSize: ScaleSize(20),
        }}
      >
        Bộ lọc
      </Text>
      <View row spread>
        <TouchableOpacityBase
          onPress={() => {}}
          style={{
            borderWidth: 1,
            minWidth: 70,
            borderColor: Colors.warnColor,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <Badge
            style={{position: 'absolute', top: -5, right: -10}}
            backgroundColor="red"
            label={summaryOrders['wc-processing'] + ''}
            size={16}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.Medium,
              color: Colors.warnColor,
              fontSize: ScaleSize(13),
            }}
          >
            Đang xử lý
          </Text>
        </TouchableOpacityBase>
        <TouchableOpacityBase
          onPress={() => {}}
          style={{
            borderWidth: 1,
            minWidth: 70,
            borderColor: Colors.successColor,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <Badge
            style={{position: 'absolute', top: -5, right: -10}}
            backgroundColor="red"
            label={summaryOrders['wc-completed'] + ''}
            size={16}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.Medium,
              color: Colors.successColor,
              fontSize: ScaleSize(13),
            }}
          >
            Hoàn thành
          </Text>
        </TouchableOpacityBase>
        <TouchableOpacityBase
          onPress={() => {}}
          style={{
            borderWidth: 1,
            minWidth: 70,
            borderColor: Colors.errorColor,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <Badge
            style={{position: 'absolute', top: -5, right: -10}}
            backgroundColor="red"
            label={summaryOrders['wc-cancelled'] + ''}
            size={16}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.Medium,
              color: Colors.errorColor,
              fontSize: ScaleSize(13),
            }}
          >
            Đã hủy
          </Text>
        </TouchableOpacityBase>
      </View>
    </View>
  );
};

function LeftDrawerScreen() {
  return (
    <RightDrawer.Navigator id="LeftDrawer" screenOptions={{drawerPosition: 'left'}}>
      <RightDrawer.Screen
        options={{
          title: '',
          headerShown: false,
        }}
        name="Oder"
        component={OrdersScreen}
      />
    </RightDrawer.Navigator>
  );
}

const RightDrawer = createDrawerNavigator();

export function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={props => <RightDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}
    >
      <RightDrawer.Screen name="OrdersDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
}
