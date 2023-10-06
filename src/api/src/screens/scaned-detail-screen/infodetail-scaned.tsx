import {ButtonBase, Screen, Toolbar} from '@components/base';
import {MainStackParamList} from '@navigation/MainStackNavigation';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useAuth} from '@core';
import {ClipboardClose, ClipboardTick} from 'iconsax-react-native';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {Card, Text, View} from 'react-native-ui-lib';
import {Colors, FontFamily, ScaleSize, Spacing} from '../../configs';
import {venderApi} from '@api/vender-api';
import {useQuery} from 'react-query';
const ScanedDetailScreen = () => {
  const {
    params: {data: id},
  } = useRoute<RouteProp<MainStackParamList, 'ScanedDetail'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {infoUser} = useAuth();
  const {data, isLoading} = useQuery(['getOderDetail', id], async () => venderApi.getOderInfo(id), {
    enabled: id !== undefined,
  });

  return (
    <Screen>
      <Toolbar title="Chi tiết " />
      {isLoading ? (
        <ActivityIndicator
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              display: 'flex',
              height: '100%',
              padding: Spacing(2),
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.Bold,
                marginBottom: 5,
                textAlign: 'center',
                fontSize: ScaleSize(18),
              }}
            >
              Thông tin đơn hàng
            </Text>
            <Card elevation={20} paddingH-10>
              <View padding-10>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.billing?.company}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.billing?.address_1}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.billing?.city}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.billing?.email}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.billing?.phone}
                </Text>
                <Text
                  style={{
                    fontFamily: FontFamily.Bold,
                    textAlign: 'right',
                    color: Colors.successColor,
                    fontSize: ScaleSize(15),
                  }}
                >
                  {data?.status}
                </Text>
              </View>
            </Card>
            <Text
              style={{
                fontFamily: FontFamily.Bold,
                marginBottom: 5,
                marginTop: 10,
                textAlign: 'center',
                fontSize: ScaleSize(18),
              }}
            >
              Thông tin cửa hàng
            </Text>
            <Card elevation={20} paddingH-10>
              <View padding-10>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.store?.name}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.store?.shop_name}
                </Text>
                <Text
                  style={{
                    fontFamily: FontFamily.Medium,
                    color: Colors.primaryColor,
                    fontSize: ScaleSize(14),
                  }}
                >
                  {data?.store?.url}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.store?.address?.street_1}
                </Text>
                <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
                  {data?.store?.phone}
                </Text>
              </View>
            </Card>
          </ScrollView>
          {data?.status !== 'completed' && data?.status !== 'cancelled' && (
            <View
              row
              style={{
                margin: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{width: '48%'}}>
                <ButtonBase
                  iconSource={() => (
                    <ClipboardClose color="#fff" style={{marginRight: Spacing(2)}} />
                  )}
                  bgColor="#bfbfbf"
                  label="Hủy"
                  loading={loading}
                  onPress={() => {
                    navigation.goBack();
                    // mutate(
                    //   {
                    //     id: data.id,
                    //     data: {
                    //       status: 'cancelled',
                    //     },
                    //   },
                    //   {
                    //     onSuccess: (res: any) => {
                    //       toast.show(`Trang thái đơn hàng đã được thay đổi`, {
                    //         type: 'success',
                    //         animationType: 'zoom-in',
                    //         animationDuration: 100,
                    //         data: {
                    //           title: 'Đã xảy ra lỗi',
                    //         },
                    //       });
                    //     },
                    //   }
                    // );
                  }}
                />
              </View>
              <View style={{width: '48%'}}>
                <ButtonBase
                  iconSource={() => (
                    <ClipboardTick color="#fff" style={{marginRight: Spacing(2)}} />
                  )}
                  label="Xác nhận"
                  onPress={() => {
                    navigation.navigate('OrderDetail', {
                      data: id,
                    });
                  }}
                />
              </View>
            </View>
          )}
        </>
      )}
    </Screen>
  );
};

export default ScanedDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  wrapItem: {
    // flex: 1,
    // alignItems: 'center',
    borderRadius: ScaleSize(8),
    padding: Spacing(2),
    backgroundColor: '#fff',
  },
  buttonContainer: {},
  img: {
    width: '100%',
    height: ScaleSize(200),
    resizeMode: 'contain',
    borderRadius: ScaleSize(6),
  },
  p: {
    color: Colors.textColor,
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: FontFamily.Medium,
    marginBottom: ScaleSize(15),
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
const a = {
  id: 15833,
  parent_id: 0,
  status: 'processing',
  currency: 'VND',
  version: '8.1.1',
  prices_include_tax: false,
  date_created: '2023-09-25T06:35:32',
  date_modified: '2023-09-25T06:35:32',
  discount_total: '0',
  discount_tax: '0',
  shipping_total: '0',
  shipping_tax: '0',
  cart_tax: '0',
  total: '0',
  total_tax: '0',
  customer_id: 2,
  order_key: 'wc_order_UumMiiu0g5tWd',
  billing: {
    first_name: 'Anh Toàn',
    last_name: 'Lê',
    company: 'F5Seconds',
    address_1: '170/12 đường 204, Cao Lỗ, Phường 4',
    address_2: '',
    city: 'Hồ Chí Minh',
    state: '',
    postcode: '',
    country: 'VN',
    email: 'toananhle91@gmail.com',
    phone: '0939450965',
  },
  shipping: {
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    phone: '',
  },
  payment_method: '',
  payment_method_title: '',
  transaction_id: '',
  customer_ip_address: '10.104.0.10',
  customer_user_agent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  created_via: 'checkout',
  customer_note: '',
  date_completed: null,
  date_paid: '2023-09-25T06:35:32',
  cart_hash: 'f83efb89058f620feaf1b6cbf71d79c3',
  number: '15833',
  meta_data: [
    {
      id: 7663,
      key: 'is_vat_exempt',
      value: 'no',
    },
    {
      id: 7664,
      key: '_dokan_vendor_id',
      value: '5',
    },
    {
      id: 7665,
      key: 'shipping_fee_recipient',
      value: 'seller',
    },
    {
      id: 7666,
      key: 'tax_fee_recipient',
      value: 'seller',
    },
    {
      id: 7667,
      key: 'shipping_tax_fee_recipient',
      value: 'seller',
    },
    {
      id: 7670,
      key: 'lmfwc_order_complete',
      value: '1',
    },
  ],
  line_items: [
    {
      id: 13,
      name: 'Henectus tincidunt',
      product_id: 411,
      variation_id: 0,
      quantity: 1,
      tax_class: 'zero-rate',
      subtotal: '0',
      subtotal_tax: '0',
      total: '0',
      total_tax: '0',
      taxes: [],
      meta_data: [
        {
          id: 135,
          key: 'Purchased By Points',
          value: '10',
          display_key: 'Purchased By Points',
          display_value: '10',
        },
        {
          id: 136,
          key: '_dokan_commission_rate',
          value: '0',
          display_key: '_dokan_commission_rate',
          display_value: '0',
        },
        {
          id: 137,
          key: '_dokan_commission_type',
          value: 'percentage',
          display_key: '_dokan_commission_type',
          display_value: 'percentage',
        },
        {
          id: 138,
          key: '_dokan_additional_fee',
          value: '0',
          display_key: '_dokan_additional_fee',
          display_value: '0',
        },
      ],
      sku: '',
      price: 0,
      image: {
        id: '4755',
        src: 'https://wp-core.sgp1.digitaloceanspaces.com/wp-content/uploads/2021/10/07021626/cars-product-2.jpg',
      },
      parent_name: null,
    },
  ],
  tax_lines: [],
  shipping_lines: [],
  fee_lines: [],
  coupon_lines: [],
  refunds: [],
  payment_url:
    'https://core-apps.f5seconds.vn/checkout/order-pay/15833/?pay_for_order=true&key=wc_order_UumMiiu0g5tWd',
  is_editable: false,
  needs_payment: false,
  needs_processing: true,
  date_created_gmt: '2023-09-24T23:35:32',
  date_modified_gmt: '2023-09-24T23:35:32',
  date_completed_gmt: null,
  date_paid_gmt: '2023-09-24T23:35:32',
  currency_symbol: '₫',
  stores: [
    {
      id: 5,
      name: 'soichien333',
      shop_name: 'Audi Store',
      url: 'https://core-apps.f5seconds.vn/store/soichien333/',
      address: {
        street_1: '481 Trường Chinh, Phường 13, Tân Bình, TP.Hồ Chí Minh, Vietnam',
        street_2: '',
        city: 'Hồ Chí Minh',
        zip: '7000',
        country: 'VN',
        state: '',
      },
    },
  ],
  store: {
    id: 5,
    name: 'soichien333',
    shop_name: 'Audi Store',
    url: 'https://core-apps.f5seconds.vn/store/soichien333/',
    address: {
      street_1: '481 Trường Chinh, Phường 13, Tân Bình, TP.Hồ Chí Minh, Vietnam',
      street_2: '',
      city: 'Hồ Chí Minh',
      zip: '7000',
      country: 'VN',
      state: '',
    },
  },
  _links: {
    self: [
      {
        href: 'https://core-apps.f5seconds.vn/wp-json/wc/v3/orders/15833',
      },
    ],
    collection: [
      {
        href: 'https://core-apps.f5seconds.vn/wp-json/wc/v3/orders',
      },
    ],
    customer: [
      {
        href: 'https://core-apps.f5seconds.vn/wp-json/wc/v3/customers/2',
      },
    ],
  },
};
