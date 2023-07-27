import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme, useLoading } from '@/core';
import { RootNavigator } from '@/navigation';

import { store } from '../store';
import { toastConfig } from './ui';
import DialogLoading from './ui/core/dialog-loading';

hydrateAuth();
loadSelectedTheme();
SplashScreen.preventAutoHideAsync();
// App-Icon-20x20@1x,
// App-Icon-20x20@2x,
// App-Icon-20x20@3x,
// App-Icon-29x29@1x,
// App-Icon-29x29@2x,
// App-Icon-29x29@3x,
// App-Icon-40x40@1x,
// App-Icon-40x40@2x,
// App-Icon-40x40@3x,
// App-Icon-60x60@1x,
// App-Icon-60x60@2x,
// App-Icon-76x76@1x,
// App-Icon-76x76@2x,
// App-Icon-83.5x83.5@2x
const App = () => {
  const checkPermissions = async () => {
    requestMultiple([
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ])
      .then((result) => {})
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Vui lòng cấp lại quyền trong cài đặt',
          text2: `Đã xảy ra lỗi ${
            error.Message
              ? error.Message
              : error.message
              ? error.message
              : 'Vui lòng thử lại sau'
          }`,
        });
      });
  };

  useEffect(() => {
    checkPermissions();
  }, []);
  const isLoading = useLoading.use.loading();

  return (
    <Provider store={store}>
      <DialogLoading isShow={isLoading} />
      <BottomSheetModalProvider>
        <APIProvider>
          <RootNavigator />
          <Toast config={toastConfig} />
          <FlashMessage position="top" />
        </APIProvider>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export default App;
