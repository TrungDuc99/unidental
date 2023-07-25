import { Bag2, SearchNormal } from 'iconsax-react-native';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import type { User } from '@/api/user/types';
import { selectUserInfo } from '@/feature/user/userSlice';
import { Image, ScrollView, Text, TouchableOpacity, View } from '@/ui';
import colors from '@/ui/theme/colors';

import MainMenu from './main-menu';
import Settings from './settings';

export const Account = () => {
  const userInfo: User = useSelector(selectUserInfo);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.primary[500]}
        translucent
      />
      <View style={styles.backgroundCurvedContainer} />
      <ScrollView>
        <View className="flex-1  p-4 pt-16">
          <View className="flex flex-row items-center justify-between ">
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
          </View>
          <View className="my-4" />
          <MainMenu />
          <View className="my-1.5" />
          <Settings />
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
