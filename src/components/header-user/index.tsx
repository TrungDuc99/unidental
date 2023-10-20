import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import type { User } from '@/api/user/types';
import { fetchUser, selectUserInfo } from '@/feature/user/userSlice';
import { Image, Text, View } from '@/ui';

interface HeaderUserProps {}

const HeaderUser = (props: HeaderUserProps) => {
  const dispatch = useDispatch();
  const userInfo: User = useSelector(selectUserInfo);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <View className="mb-10 flex flex-row items-center">
      <Image
        source={userInfo?.avatarUrl ?? ''}
        style={{
          width: 50,
          height: 50,
          borderRadius: 1000,
        }}
      />
      <View>
        <Text className="ml-2 font-medium">{userInfo?.name ?? ''}</Text>
        <Text className="ml-2 font-medium">{userInfo?.email ?? ''}</Text>
      </View>
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({
  container: {},
});
