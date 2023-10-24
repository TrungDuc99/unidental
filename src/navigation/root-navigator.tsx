/* eslint-disable max-lines-per-function */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { Call } from 'iconsax-react-native';
import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import { fetchUser } from '@/feature/user/userSlice';
import CartDetail from '@/screens/cart-detail';
import ChatRoomScreen from '@/screens/chat-room';
import Onboarding from '@/screens/onboarding/onboarding';
import Scanned from '@/screens/scanned';
import SearchFriends from '@/screens/search-friends';
import { colors, Image, Text, VideoCall, View } from '@/ui';

import { AuthNavigator } from './auth-navigator';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
const Stack = createNativeStackNavigator();

export const Root = () => {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const dispatch = useDispatch();
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      hideSplash();
    }
    if (status === 'signIn') {
      dispatch(fetchUser());
    }
  }, [hideSplash, status]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'flip',
      }}
    >
      {isFirstTime ? (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </>
      ) : (
        <Stack.Group>
          {status === 'signOut' ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <>
              <Stack.Screen name="App" component={TabNavigator} />
              <Stack.Screen
                options={{
                  headerShown: true,
                  headerBackTitleVisible: false,
                  headerTitle: ChatRoomHeader,
                }}
                name="ChatRoom"
                component={ChatRoomScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Scanned"
                component={Scanned}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="SearchFriend"
                component={SearchFriends}
              />
              <Stack.Screen
                options={{
                  presentation: 'modal',
                  headerShown: false,
                }}
                name="CartDetail"
                component={CartDetail}
              />
            </>
          )}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
const ChatRoomHeader = (props: any) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: width - 50,
        marginLeft: -15,
        alignItems: 'center',
      }}
    >
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
        }}
      />
      <Text
        className="ml-1 font-bold"
        style={{
          flex: 1,
        }}
      >
        {props.children}
      </Text>

      <Call size={24} variant="Bold" color={colors.primary[500]} />
      <View className="mx-1" />
      <VideoCall color={colors.primary[500]} />
    </View>
  );
};
