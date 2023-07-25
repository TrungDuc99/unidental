import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Calendar,
  Home2,
  Message,
  Profile,
  ScanBarcode,
} from 'iconsax-react-native';
import Lottie from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import { ScaleSize } from '@/configs';
import { Account } from '@/screens';
import { QrCode } from '@/screens/qr-code';
import { colors } from '@/ui';

import { BookingNavigator } from './booking-navigator';
import { ChatsNavigator } from './chats-navigator';
import { HomeNavigator } from './home-navigator';

type TabParamList = {
  Chat: undefined;
  HomeNavigator: undefined;
  QrCode: undefined;
  Booking: undefined;
  Account: undefined;
};
type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  Account: (props: any) => {
    return (
      // <View className={`${props.focused && 'rounded-full bg-primary-800 p-2'}`}>
      <Profile {...props} variant={props.focused ? 'Bulk' : 'Linear'} />
      // </View>
    );
  },

  HomeNavigator: (props: any) => {
    if (props.focused) {
      return (
        <Lottie
          style={{ height: ScaleSize(28) }}
          source={require('@/assets/animation/home-border.json')}
          autoPlay
          loop
        />
      );
    } else {
      return <Home2 {...props} />;
    }
  },
  Chat: (props: any) => {
    return <Message {...props} variant={props.focused ? 'Bulk' : 'Linear'} />;
  },

  Booking: (props: any) => {
    return <Calendar {...props} variant={props.focused ? 'Bulk' : 'Linear'} />;
  },

  QrCode: (props: any) => {
    return (
      <ScanBarcode {...props} variant={props.focused ? 'Bulk' : 'Linear'} />
    );
  },
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'HomeNavigator',
    component: HomeNavigator,
    label: 'Home',
  },

  {
    name: 'Chat',
    component: ChatsNavigator,
    label: 'Chat',
  },

  {
    name: 'QrCode',
    component: QrCode,
    label: 'Qr Code',
  },
  {
    name: 'Booking',
    component: BookingNavigator,
    label: 'Booking',
  },
  {
    name: 'Account',
    component: Account,
    label: 'Account',
  },
];

type BarIconType = {
  name: keyof TabParamList;
  color: string;
  focused: boolean;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];

  return <Icon color={color} {...reset} />;
};

export const TabNavigator = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor:
          colorScheme === 'dark' ? colors.charcoal[400] : colors.neutral[400],

        tabBarIcon: ({ color, focused }) => (
          <BarIcon name={route.name} color={color} focused={focused} />
        ),
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
