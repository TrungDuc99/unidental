// import {venderApi} from '@api/vender-api';
// import {FlatListBase} from '@components/base';
// import SearchBarBase from '@components/base/search-bar-base';
// import {FontFamily, ScaleSize, Spacing} from '@configs';
// import {PaginationParams} from '@models';
// import {DocumentFilter} from 'iconsax-react-native';
// import * as React from 'react';
// import {Platform, StyleSheet} from 'react-native';
// import {Card, Text, View} from 'react-native-ui-lib';
// import {useInfiniteQuery} from 'react-query';
// import OderCard from './order-card';

// const ProductsScreen = () => {
//   const [pagination, setPagination] = React.useState<PaginationParams>({
//     currentPage: 1,
//     totalPages: 1,
//     pageSize: 10,
//     totalCount: 1,
//     hasPrevious: false,
//     hasNext: false,
//   });

//   const {data, isLoading, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery(
//     ['danhSachSanPham'],
//     ({pageParam}) =>
//       venderApi.getAllOder({
//         customer: 2,
//         status: 'processing',
//       }),
//     {
//       getNextPageParam: (lastPage, page) => {},
//       onSuccess: dataResult => {
//         if (dataResult) {
//           const {pages} = dataResult;
//           if (pages[0]) {
//             const {currentPage, totalPages, pageSize, totalCount, hasNext, hasPrevious} = pages[0];
//             setPagination({
//               currentPage,
//               hasNext,
//               hasPrevious,
//               pageSize,
//               totalCount,
//               totalPages,
//             });
//           }
//         }
//       },
//       onError(err) {
//         console.log(err);
//       },
//     }
//   );
//   // console.log(data.pages?.[0]);

//   return (
//     <View flex style={styles.container}>
//       <Text
//         style={{
//           fontFamily: FontFamily.Bold,
//           color: '#093887',
//           fontSize: ScaleSize(21),
//         }}
//         marginH-10
//       >
//         Sản phẩm
//       </Text>
//       <View row marginH-10 marginV-10>
//         <View style={{width: '85%'}}>
//           <SearchBarBase />
//         </View>
//         <Card onPress={() => {}} padding-5 center marginH-8 elevation={20}>
//           <DocumentFilter size={33} color={'#9E9E9E'} />
//         </Card>
//       </View>
//       <FlatListBase
//         style={{
//           flex: 1,

//           display: 'flex',
//         }}
//         ListEmptyComponent={<View></View>}
//         showsVerticalScrollIndicator={false}
//         data={data?.pages?.flatMap(item => item ?? []) ?? []}
//         renderItem={({item}: {item: any}) => {
//           return <OderCard key={item.id} item={item} onPress={() => {}} />;
//         }}
//         pagination={pagination}
//         isFetchingNextPage={isFetchingNextPage}
//         onLoadMore={fetchNextPage}
//         onRefresh={refetch}
//       />
//     </View>
//   );
// };

// export default ProductsScreen;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: Platform.OS === 'ios' ? Spacing(10) : Spacing(1),
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React from 'react';
import {venderApi} from '@api/vender-api';
import {PaginationParams} from '@models';

import {useInfiniteQuery} from 'react-query';

import {MotiView} from 'moti';

import {Colors} from '@configs';
import {FlatListBase} from '@components/base';

const ProductsScreen = () => {
  const [pagination, setPagination] = React.useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 1,
    hasPrevious: false,
    hasNext: false,
  });

  const {
    data: products,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['danhSachSanPham'],
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
  const renderItem = ({item, index}) => {
    return (
      <MotiView
        style={styles.listContainer}
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: 1000 + index * 200}}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{item.price}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log('BUY NOW!', index);
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Thêm vào giỏ</Text>
          </View>
        </TouchableWithoutFeedback>
      </MotiView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatListBase
        data={products?.pages?.flatMap(item => item ?? []) ?? []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        pagination={pagination}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        onRefresh={refetch}
      />
      {/* <FlatListBase
        style={{
          flex: 1,

          display: 'flex',
        }}
        ListEmptyComponent={<View></View>}
        showsVerticalScrollIndicator={false}
        data={data?.pages?.flatMap(item => item ?? []) ?? []}
        renderItem={({item}: {item: any}) => {
          return <OderCard key={item.id} item={item} onPress={() => {}} />;
        }}
        pagination={pagination}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        onRefresh={refetch}
      /> */}
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FD',
  },
  listContainer: {
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
  },
  imageContainer: {
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {width: '100%', height: undefined, aspectRatio: 1},
  nameText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  priceText: {
    color: 'orange',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
