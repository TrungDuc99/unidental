/* eslint-disable max-lines-per-function */

import { useNavigation } from '@react-navigation/native';
import { Bag2, SearchNormal } from 'iconsax-react-native';
import React, { useRef } from 'react';
import { Animated, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import type { User } from '@/api/user/types';
import CartPopup from '@/components/popup-cart';
import { selectUserInfo } from '@/feature/user/userSlice';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import colors from '@/ui/theme/colors';

import Endows from './endows';
import MainMenu from './menu-header';

export const Home = () => {
  const { navigate } = useNavigation();
  const userInfo: User = useSelector(selectUserInfo);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const backgroundViewAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  return (
    <View style={styles.container}>
      <CartPopup />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.primary[500]}
        translucent
      />
      <Animated.View
        style={[styles.backgroundCurvedContainer, backgroundViewAnimation]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        onScrollEndDrag={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;

          if (offsetY < 150) {
            scrollViewRef.current?.scrollTo({
              y: scrollDirection.current === 'down' ? 100 : 0,
              animated: true,
            });
          }
        }}
        scrollEventThrottle={16}
      >
        <View className="flex-1  pt-16 ">
          <Animated.View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              },
              backgroundViewAnimation,
            ]}
          >
            <View className="flex flex-row">
              <Image
                source={userInfo.avatarUrl}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 1000,
                }}
              />
              <View>
                <Text variant="md" className="ml-2 font-medium text-white">
                  {userInfo.name}
                </Text>
                <Text className="ml-2 font-medium text-textprimary-50">
                  Xin chào!
                </Text>
              </View>
            </View>
            <View className="flex flex-row  ">
              <TouchableOpacity>
                <SearchNormal color={'white'} />
              </TouchableOpacity>
              <View className="mr-4" />
              <TouchableOpacity>
                <Bag2 color={'white'} />
              </TouchableOpacity>
              <View>
                <View style={styles.NotifiBag}>
                  <Text
                    style={{ position: 'absolute', top: -3 }}
                    className=" text-center text-[12px] font-bold text-white"
                  >
                    1
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
          <View className="my-3" />
          <MainMenu />
          <View className="my-2" />
          <Endows navigation={navigate} />
          {/* <Feed /> */}
          {/* <Posts navigation={navigate} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-between',
  },
  locationContainer: {},
  backgroundCurvedContainer: {
    backgroundColor: colors.primary[510],
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  NotifiBag: {
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -4,
    left: -10,
    borderRadius: 1000,
    backgroundColor: 'red',
  },
});
