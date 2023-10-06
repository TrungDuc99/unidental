import {ButtonBase, CardBase, Screen, Toolbar} from '@components/base';
import {MainStackParamList} from '@navigation/MainStackNavigation';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Camera, ClipboardClose, ClipboardTick, UserSquare} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {Colors, FontFamily, ScaleSize, Spacing} from '../../configs';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {Image} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useAuth} from '@core';
import {useUpdateOderVender} from '@api/vender-api';
import {useForm} from 'react-hook-form';
import {InputField} from '@components/forms';
import {useQueryClient} from 'react-query';
const OderDetailScreen = () => {
  const {
    params: {data: id},
  } = useRoute<RouteProp<MainStackParamList, 'ScanedDetail'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const form = useForm();
  const {setFocus, handleSubmit} = form;
  const toast = useToast();
  const {infoUser} = useAuth();
  const queryclient = useQueryClient();

  const {mutate, isLoading} = useUpdateOderVender();
  const [imageBillTotal, setImageBillTotal] =
    React.useState<
      | {
          uri: string;
          path: string;
          name: string;
          type: string;
          width: number;
          height: number;
          size: number;
        }
      | undefined
    >();
  useEffect(() => {
    setFocus('billTotal');
  }, []);

  const imageFromCameraToMarker = async () => {
    try {
      const res = await ImagePicker.openCamera({
        // cropping: true,
        compressImageQuality: 0.3,
      });
      const arr = res.path.split('/');
      const file1 = {
        //  uri: Platform.OS === 'ios' ? res.path : `file://${res.path}`,
        uri: res.path,
        path: res.path,
        name: arr[arr.length - 1],
        type: res.mime,
        size: res.size,
        width: res.width,
        height: res.height,
      };
      if (file1.uri) {
        setImageBillTotal(file1);
        // navigation.navigate('ViewImage', {file: file1, idScreen: '1'});
      }
    } catch (error) {}
  };
  const onSubmit = (data: any) => {
    if (imageBillTotal) {
      ImgToBase64.getBase64String(imageBillTotal.path)
        .then((base64String: string) => {
          mutate(
            {
              id: id,
              data: {
                status: 'completed',
                meta_data: [
                  {
                    key: 'bill_image',
                    value: `data:image/png;base64,${base64String}`,
                  },
                  {
                    key: 'bill_total',
                    value: data.billTotal,
                  },
                ],
              },
            },
            {
              onSuccess(data, variables, context) {
                queryclient.invalidateQueries('getOderDetail');
                navigation.goBack();
              },
              onError(error, variables, context) {
                toast.show(`Đã xảy ra lỗi! ${error?.message ?? ''}`, {
                  type: 'danger_toast',
                  animationDuration: 100,
                  data: {
                    title: 'Đã xảy ra lỗi',
                  },
                });
              },
            }
          );
        })
        .catch((err: any) => console.log(err));
    }
  };
  return (
    <Screen>
      <Toolbar title="Xác nhận" />

      <ScrollView
        contentContainerStyle={{
          padding: Spacing(5),
        }}
      >
        <CardBase>
          <InputField
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="billTotal"
            label="Tổng hóa đơn"
            isNumber
            isFormatNumber
            placeholder=""
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ họ tên',
              },
            }}
          />
        </CardBase>
        <View marginB-10 />
        {imageBillTotal && (
          <CardBase>
            <Image
              source={{uri: imageBillTotal?.uri}}
              resizeMode="center"
              style={{
                width: '100%',
                height: ScaleSize(500),
              }}
            />
          </CardBase>
        )}
      </ScrollView>
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
            iconSource={() => <ClipboardClose color="#fff" style={{marginRight: Spacing(2)}} />}
            bgColor="#bfbfbf"
            label="Hủy"
            loading={isLoading}
            onPress={() => {
              mutate(
                {
                  id: id,
                  data: {
                    status: 'cancelled',
                  },
                },
                {
                  onSuccess: (res: any) => {
                    toast.show(`Trang thái đơn hàng đã được thay đổi`, {
                      type: 'success',
                      animationType: 'zoom-in',
                      animationDuration: 100,
                      data: {
                        title: 'Đã xảy ra lỗi',
                      },
                    });
                  },
                }
              );
            }}
          />
        </View>
        <View style={{width: '48%'}}>
          {imageBillTotal ? (
            <ButtonBase
              loading={isLoading}
              iconSource={() => <ClipboardTick color="#fff" style={{marginRight: Spacing(2)}} />}
              label="Xác nhận"
              onPress={handleSubmit(onSubmit)}
            />
          ) : (
            <ButtonBase
              iconSource={() => <Camera color="#fff" style={{marginRight: Spacing(2)}} />}
              label="Chụp đơn hàng"
              onPress={() => {
                imageFromCameraToMarker();
              }}
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

export default OderDetailScreen;

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
