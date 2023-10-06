import {venderApi} from '@api/vender-api';
import {Screen, Toolbar} from '@components/base';
import DialogConfirm from '@components/base/dialog-confirm';
import {InputField} from '@components/forms';
import DatePickerField from '@components/forms/date-picker-field';
import {ScaleSize, Spacing} from '@configs';
import {useAuth} from '@core';
import {useNavigation} from '@react-navigation/native';
import {HambergerMenu, Lock, SmsTracking, UserSquare} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import {KeyboardAwareScrollView, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {token, infoUser} = useAuth();

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [deviceToken, setDeviceToken] = React.useState('');
  const [titleType, setTitleType] = React.useState('');
  const [contentDialog, setContentDialog] = React.useState('');

  const getDeviceToken = async () => {
    const deviceState = await OneSignal.getDeviceState();
    setDeviceToken(deviceState?.userId ?? '');

    setValue('deviceToken', deviceState?.userId ?? '');
  };

  const form = useForm<any>();
  const {setValue} = form;
  useEffect(() => {
    getDeviceToken();
    setValue('token', token?.access);
    setValue('tenNhanVien', infoUser?.first_name ?? '');
    setValue('username', infoUser?.username ?? '');
    setValue('email', infoUser?.email ?? '');
    setValue('role', infoUser?.role ?? '');
  }, [infoUser]);
  const navigation = useNavigation<any>();
  return (
    <Screen>
      <Toolbar
        showBackButton={false}
        iconRight={{
          icon: HambergerMenu,
          onPress: () => {
            navigation.openDrawer();
          },
        }}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View center>
          <View marginT-16 style={{position: 'relative'}}>
            <FastImage
              style={{
                width: ScaleSize(180),
                height: ScaleSize(180),
                borderRadius: ScaleSize(100),
              }}
              source={{
                uri:
                  infoUser?.avatar_url ??
                  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View style={{padding: Spacing(4)}}>
          <InputField
            disable
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="role"
            label=""
            placeholder="Họ và tên"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ họ tên',
              },
            }}
          />
          <View style={{padding: Spacing(3)}} />
          <InputField
            disable
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="username"
            label=""
            placeholder="User name"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ họ tên',
              },
            }}
          />
          <View style={{padding: Spacing(3)}} />
          <InputField
            disable
            iconLeft={{iconName: UserSquare}}
            form={form}
            name="tenNhanVien"
            label=""
            placeholder="Họ và tên"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng điền đầy đủ họ tên',
              },
            }}
          />

          <InputField
            iconLeft={{iconName: SmsTracking}}
            form={form}
            name="email"
            disable
            label=""
            placeholder="Email"
            marginT-20
          />

          <InputField
            disable
            iconLeft={{iconName: Lock}}
            form={form}
            name="token"
            onPressField={() => {
              setTitleType('Authen token');
              setContentDialog(token?.access || '');
              setOpenConfirm(true);
            }}
            label=""
            placeholder="Token Authen"
            marginT-20
          />
          <InputField
            disable
            iconLeft={{iconName: Lock}}
            form={form}
            name="deviceToken"
            onPressField={() => {
              setTitleType('Device token');
              setContentDialog(deviceToken);
              setOpenConfirm(true);
            }}
            label=""
            placeholder="Device Token"
            marginT-20
          />
        </View>
        {/* <View style={{marginBottom: Spacing(30)}} /> */}
        <DialogConfirm
          title={`${titleType} \n(nhấn giữ để sao chép)`}
          open={openConfirm}
          isShowText
          content={contentDialog}
          onClose={() => setOpenConfirm(false)}
          onAccept={() => setOpenConfirm(false)}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default ProfileScreen;
