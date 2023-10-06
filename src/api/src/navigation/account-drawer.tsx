import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {useAuth} from '@core';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {logOutHandle} from '@redux/actions/user-action';

import ProfileScreen from '@screens/profile-screen';

import {Logout, UserSquare} from 'iconsax-react-native';
import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
export type AccountDrawerParamList = {
  ChangePassword: undefined;
  HistoryOrder: undefined;
  SearchUser: undefined;
  Voucher: undefined;
  Profile: undefined;
  StoreInfo: undefined;
  Users: undefined;
  collectPoints: {
    code?: any;
    file?: any;
    routeName: 'ScanCode' | 'ImportCode';
  };
};
const Drawer = createDrawerNavigator<AccountDrawerParamList>();
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {state, descriptors, navigation} = props;
  const dispatch = useDispatch();
  const {signOut} = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      {props.state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        return (
          <DrawerItem
            key={route.name}
            style={{borderBottomColor: '#eee', borderBottomWidth: ScaleSize(1)}}
            labelStyle={{
              color: isFocused ? Colors.secondaryColor : Colors.textColor,
              fontFamily: FontFamily.Medium,
              fontSize: ScaleSize(14),
              marginLeft: -Spacing(5),
              marginRight: -Spacing(5),
            }}
            icon={p => options.drawerIcon && options.drawerIcon({...p, focused: isFocused})}
            label={options.title ?? route.name}
            onPress={() => {
              const event = navigation.emit({
                type: 'drawerItemPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          />
        );
      })}
      <DrawerItem
        labelStyle={{
          color: Colors.errorColor,
          fontFamily: FontFamily.Medium,
          fontSize: ScaleSize(14),
          marginLeft: -Spacing(5),
        }}
        icon={p => <Logout {...p} color={Colors.errorColor} />}
        label="Đăng xuất"
        onPress={() => {
          signOut();
          dispatch(logOutHandle());
        }}
      />
      <View></View>
    </DrawerContentScrollView>
  );
}
const AccountDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerPosition: 'right',
        drawerType: 'front',
        drawerActiveTintColor: Colors.errorColor,
        drawerInactiveTintColor: Colors.errorColor,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Profile"
        options={{
          title: 'Thông tin cá nhân',
          drawerIcon: props => (
            <UserSquare
              size={ScaleSize(22)}
              color={props.focused ? Colors.secondaryColor : Colors.textColor}
            />
          ),
        }}
        component={ProfileScreen}
      />

      {/* <Drawer.Screen
        name="StoreInfo"
        options={{
          title: 'Thông tin cửa hàng',
          drawerIcon: props => (
            <Building
              size={ScaleSize(22)}
              color={props.focused ? Colors.secondaryColor : Colors.textColor}
            />
          ),
        }}
        component={StoreInfoScreen}
      />
      <Drawer.Screen
        name="Users"
        options={{
          title: 'Người dùng',
          drawerIcon: props => (
            <Profile
              size={ScaleSize(22)}
              color={props.focused ? Colors.secondaryColor : Colors.textColor}
            />
          ),
        }}
        component={UsersInfoScreen}
      /> */}
    </Drawer.Navigator>
  );
};

export default AccountDrawer;
