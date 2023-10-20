import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import userService from '@/api/user';
import type { User } from '@/api/user/types';
import SearchBar from '@/components/search-bar';
import socket from '@/core/utils/socket';
import { selectUserInfo } from '@/feature/user/userSlice';
import { EmptyList, ScrollView, View } from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';

import FriendItem from './friend-item';

const SearchFriends = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const userInfo: User = useSelector(selectUserInfo);

  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    if (searchValue !== '' && searchValue !== ' ') {
      setIsLoading(true);
      userService
        .searchUser(searchValue)
        .then((res) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setData([]);
          setIsLoading(false);
        });
    }
  }, [searchValue]);

  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: User }) => (
      <FriendItem
        {...item}
        onPress={() => {
          // navigate('ChatRoom', { id: '', name: item.name });
          const users = [
            {
              name: userInfo?.name ?? '',
              id: userInfo._id,
              imageUri: userInfo?.avatarUrl ?? '',
            },
            {
              name: item.name,
              id: item._id,
              imageUri: item.avatarUrl,
            },
          ];
          socket.emit('createRoom', item.name, users, (roomId: string) => {
            navigate('ChatRoom', { id: roomId, name: item.name });
          });
        }}
      />
    ),
    [navigate]
  );
  return (
    <View className="flex-1" style={styles.container}>
      <BackTopBar title="Tìm cuộc trò chuyện" />
      <ScrollView className="m-4">
        <SearchBar
          isLoading={isLoading}
          onSubmit={(value) => {
            setSearchValue(value);
          }}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        />
      </ScrollView>
    </View>
  );
};

export default SearchFriends;

const styles = StyleSheet.create({
  container: {},
});
