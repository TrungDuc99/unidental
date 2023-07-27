/* eslint-disable max-lines-per-function */

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
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

const App = () => {
  // const checkPermissions = async () => {
  //   requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
  //     // …
  //   });
  //   requestMultiple([
  //     Platform.OS === 'ios'
  //       ? PERMISSIONS.IOS.CAMERA
  //       : PERMISSIONS.ANDROID.CAMERA,
  //   ])
  //     .then((result) => {})
  //     .catch((error) => {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Vui lòng cấp lại quyền trong cài đặt',
  //         text2: `Đã xảy ra lỗi ${
  //           error.Message
  //             ? error.Message
  //             : error.message
  //             ? error.message
  //             : 'Vui lòng thử lại sau'
  //         }`,
  //       });
  //     });
  // };
  // const getPermissions = async () => {
  //   const cameraPermission = await Camera.getCameraPermissionStatus();
  //   if (cameraPermission === 'denied') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Cool Photo App Camera Permission',
  //           message:
  //             'Cool Photo App needs access to your camera ' +
  //             'so you can take awesome pictures.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the camera');
  //       } else {
  //         console.log('Camera permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     checkPermissions();
  //   } else if (Platform.OS === 'ios') {
  //     getPermissions();
  //   }
  // }, []);
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
