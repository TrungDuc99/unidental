import {useUpdateValidId, venderApi} from '@api/vender-api';
import {FlatListBase} from '@components/base';
import SearchBarBase from '@components/base/search-bar-base';
import {FontFamily, ScaleSize, Spacing} from '@configs';
import {useAuth} from '@core';
import {PaginationParams} from '@models';
import {useNavigation} from '@react-navigation/native';
import {DocumentFilter} from 'iconsax-react-native';
import * as React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {Card, Text, View} from 'react-native-ui-lib';
import {useInfiniteQuery} from 'react-query';
import OderCard from './order-card';
const OrdersScreen = () => {
  const [pagination, setPagination] = React.useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 1,
    hasPrevious: false,
    hasNext: false,
  });

  const {infoUser, setLoadingDialog, setSummaryOrders} = useAuth();

  const {mutate} = useUpdateValidId();
  const {data, isLoading, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery(
    ['danhSachDonHang'],
    ({pageParam}) =>
      venderApi.getAllOder({
        customer: 2,
        status: 'processing',
      }),
    {
      getNextPageParam: (lastPage, page) => {},
      onSuccess: dataResult => {
        if (dataResult) {
          const {pages} = dataResult;
          if (pages[0]) {
            const {currentPage, totalPages, pageSize, totalCount, hasNext, hasPrevious} = pages[0];
            setPagination({
              currentPage,
              hasNext,
              hasPrevious,
              pageSize,
              totalCount,
              totalPages,
            });
          }
        }
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const navigation = useNavigation<any>();
  const toast = useToast();
  const onPressOder = (data: any) => {
    setLoadingDialog(true);
    mutate(
      {
        order_id: infoUser?.id,
        vendor_id: data.id,
      },
      {
        onSuccess(data, variables, context) {
          navigation.navigate('ScanedDetail', {
            data: data.id,
            email: infoUser?.email ?? '',
          });
          setLoadingDialog(false);
        },
        onError(error, variables, context) {
          setLoadingDialog(false);
          toast.show(`Đã xảy ra lỗi ${error}`, {
            type: 'danger_toast',
            animationType: 'zoom-in',
            animationDuration: 100,
            data: {
              title: 'Đã xảy ra lỗi',
            },
          });
        },
      }
    );
  };
  const OrdersSummary = async () => {
    const res = await venderApi.getOrdersSummary();
    setSummaryOrders(res);
  };
  React.useEffect(() => {
    OrdersSummary();
  }, []);
  return (
    <>
      <View flex style={styles.container}>
        <Text
          style={{
            fontFamily: FontFamily.Bold,
            color: '#093887',
            fontSize: ScaleSize(21),
          }}
          marginH-10
        >
          Đơn hàng
        </Text>

        <View row marginH-10 marginV-8>
          <View style={{width: '85%'}}>
            <SearchBarBase />
          </View>
          <Card
            onPress={() => {
              navigation.getParent('RightDrawer').openDrawer();
            }}
            padding-5
            center
            marginH-8
            elevation={20}
          >
            <DocumentFilter size={33} color={'#9E9E9E'} />
          </Card>
        </View>

        <FlatListBase
          style={{
            flex: 1,
            display: 'flex',
          }}
          ListEmptyComponent={<View></View>}
          showsVerticalScrollIndicator={false}
          data={data?.pages?.flatMap(item => item ?? []) ?? []}
          renderItem={({item}: {item: any}) => {
            return <OderCard key={item.id} item={item} onPress={item => onPressOder(item)} />;
          }}
          pagination={pagination}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
          onRefresh={refetch}
        />
      </View>
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? Spacing(10) : Spacing(1),
  },
});
