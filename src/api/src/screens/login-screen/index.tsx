import {useAuthenticateVender, venderApi} from '@api/vender-api';
import {ButtonBase, TextBase, TouchableOpacityBase} from '@components/base';
import {CheckBoxField, InputField} from '@components/forms';
import {Colors, ScaleSize, Spacing} from '@configs';
import {getPassword, getPhoneNumber} from '@core/Auth/utils';
import {yupResolver} from '@hookform/resolvers/yup';
import {RootStackParamList} from '@navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Call, Eye, EyeSlash, Lock, Login} from 'iconsax-react-native';
import jwt_decode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {ScrollView} from 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import {useToast} from 'react-native-toast-notifications';
import {View} from 'react-native-ui-lib';
import * as yup from 'yup';
import {useAuth} from '../../core';
const rnBiometrics = new ReactNativeBiometrics();
type FormData = {
  // email: string;
  phoneNumber: any;
  password: string;
  remember: boolean;
};

const schema = yup.object().shape({
  phoneNumber: yup.string().required('Vui lòng nhập số điện thoại'),
  //email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});
export type LoginNavigationScreenProp = StackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const {signIn, setInfoUser, setLoadingDialog} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [accuracyType, setAccuracyType] = useState<string>();

  const form = useForm<FormData>({
    defaultValues: {
      // email: '',
      phoneNumber: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const {handleSubmit, watch} = form;
  const {mutate, isLoading} = useAuthenticateVender();
  const [loading, setLoading] = useState(false);
  const handleFinger = async () => {
    setLoading(true);
    setLoadingDialog(true);
    const deviceState = await OneSignal.getDeviceState();
    rnBiometrics
      .simplePrompt({promptMessage: 'Vui lòng xác thực', cancelButtonText: 'Trở lại'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          const phoneNumber = getPhoneNumber();
          const password = getPassword();
          if (phoneNumber && password) {
            //form.setValue('email', email);
            form.setValue('phoneNumber', phoneNumber);
            form.setValue('password', password);
            mutate(
              {
                password: password,
                username: phoneNumber,
                deviceToken: deviceState?.userId ?? '',
              },
              {
                onSuccess: async (res: any) => {
                  const decoded: any = jwt_decode(res.token);
                  const id = decoded?.data?.user?.id ?? 5;
                  const resApi = await venderApi.getInfoUserVender(id);
                  if (resApi) {
                    const updateUserResponse = await venderApi.updateUserInfo({
                      id: id,
                      data: {
                        meta_data: [
                          {
                            key: 'device_token',
                            value: deviceState?.userId ?? '',
                          },
                        ],
                      },
                    });

                    if (resApi.role === 'seller' && updateUserResponse) {
                      setInfoUser(resApi);
                      setLoading(false);
                      setLoadingDialog(false);
                      signIn({access: res.token}, watch('remember'), phoneNumber, password);
                    } else {
                      toast.show(`Tài khoản của bạn không có quyền Merchant, đăng nhập thất bại!`, {
                        type: 'danger_toast',
                        animationDuration: 100,
                        data: {
                          title: 'Đã xảy ra lỗi',
                        },
                      });
                      setLoading(false);
                      setLoadingDialog(false);
                    }
                  } else {
                    toast.show(`Lỗi đăng nhập! Không tìm thấy thông tin tài khoản`, {
                      type: 'danger_toast',
                      animationDuration: 100,
                      data: {
                        title: 'Đã xảy ra lỗi',
                      },
                    });
                    setLoadingDialog(false);
                    setLoading(false);
                  }
                },
              }
            );
            setLoadingDialog(false);
            setLoading(false);
          } else {
            toast.show(`Vui lòng đăng nhập lần đầu trước khi sử dụng tính năng này`, {
              type: 'danger',
            });
            setLoadingDialog(false);
            setLoading(false);
          }
        } else {
          toast.show(`Xác thực không thành công`, {
            type: 'danger',
          });
          setLoadingDialog(false);
          setLoading(false);
        }
      })
      .catch(() => {
        // toast.show(`Lỗi hoặc thiết bị không hỗ trợ tính năng này`, {
        //   type: 'danger',
        // });
      });
    setLoadingDialog(false);
    setLoading(false);
  };
  useEffect(() => {
    handleFinger();
    checkAccuracyType();
  }, [form]);
  const checkAccuracyType = async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setAccuracyType('TouchID');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setAccuracyType('FaceID');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setAccuracyType('Biometrics');
      } else {
        setAccuracyType('');
      }
    });
  };

  const onSubmit = async (data: FormData) => {
    setLoadingDialog(true);
    setLoading(true);
    try {
      const deviceState = await OneSignal.getDeviceState();

      mutate(
        {
          password: data.password,
          username: data.phoneNumber,
          deviceToken: deviceState?.userId ?? '',
        },
        {
          onSuccess: async (res: any) => {
            const decoded: any = jwt_decode(res.token);
            const id = decoded?.data?.user?.id ?? 5;
            const resApi = await venderApi.getInfoUserVender(id);
            if (resApi) {
              if (resApi.role === 'seller') {
                setInfoUser(resApi);
                setLoading(false);
                setLoadingDialog(false);
                signIn({access: res.token}, data.remember, data.phoneNumber, data.password);
              } else {
                toast.show(`Tài khoản của bạn không có quyền Merchant, đăng nhập thất bại!`, {
                  type: 'danger_toast',
                  animationDuration: 100,
                  data: {
                    title: 'Đã xảy ra lỗi',
                  },
                });
                setLoadingDialog(false);
                setLoading(false);
              }
            } else {
              toast.show(`Lỗi đăng nhập! Không tìm thấy thông tin tài khoản`, {
                type: 'danger_toast',
                animationDuration: 100,
                data: {
                  title: 'Đã xảy ra lỗi',
                },
              });
              setLoadingDialog(false);
              setLoading(false);
            }
          },
          onError() {
            toast.show(`Đã xảy ra lỗi. Thông tin tài khoản hoặc mật khẩu không đúng`, {
              type: 'danger_toast',
              animationDuration: 100,
              data: {
                title: 'Đã xảy ra lỗi',
              },
            });
            setLoadingDialog(false);
            setLoading(false);
          },
        }
      );
      setLoadingDialog(false);
      setLoading(false);
    } catch (error) {
      toast.show(`Đã xảy ra lỗi. Thông tin tài khoản hoặc mật khẩu không đúng`, {
        type: 'danger_toast',
        animationDuration: 100,
        data: {
          title: 'Đã xảy ra lỗi',
        },
      });
      setLoadingDialog(false);
      setLoading(false);
      // showErrorMessage(JSON.stringify(error));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View flex paddingH-20 backgroundColor="#fff">
          <KeyboardAvoidingView behavior="position">
            <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} />

            <View style={{marginTop: ScaleSize(130), alignItems: 'center'}}>
              <Image
                source={require('@assets/images/logo.png')}
                style={{
                  width: ScaleSize(200),
                  height: ScaleSize(44),
                }}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: ScaleSize(60)}}>
              <TextBase fontFamily="SemiBold" fontSize={24} color="#555">
                Chào mừng Merchants
              </TextBase>
            </View>
            <View marginT-40>
              <InputField
                iconLeft={{iconName: Call}}
                form={form}
                name="phoneNumber"
                label=""
                placeholder="Nhập số điện thoại"
              />
              <InputField
                marginT-20
                form={form}
                name="password"
                label=""
                placeholder="Mật khẩu"
                iconLeft={{iconName: Lock}}
                iconRight={{
                  iconName: showPassword ? Eye : EyeSlash,
                  onPress: () => setShowPassword(prev => !prev),
                }}
                secureTextEntry={!showPassword}
              />
              <View style={{marginTop: Spacing(5), alignItems: 'center'}}>
                <CheckBoxField form={form} name="remember" label="Ghi nhớ đăng nhập" />
              </View>
              <ButtonBase
                marginT-52
                label="Đăng nhập"
                loading={isLoading || loading}
                onPress={handleSubmit(onSubmit)}
                iconSource={() => (
                  <Login color="#fff" size={ScaleSize(22)} style={{marginRight: Spacing(1)}} />
                )}
              />

              <View style={{marginTop: Spacing(10), alignItems: 'center'}}>
                <TouchableOpacityBase onPress={handleFinger}>
                  <Image
                    source={
                      accuracyType === 'FaceID'
                        ? require('@assets/images/faceid.png')
                        : require('@assets/images/finger_br.png')
                    }
                    style={{
                      width: ScaleSize(44),
                      height: ScaleSize(44),
                    }}
                  />
                </TouchableOpacityBase>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
