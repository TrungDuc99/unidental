import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/core';
import { RootNavigator } from '@/navigation';

import { store } from '../store';
import { toastConfig } from './ui';

hydrateAuth();
loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <Provider store={store}>
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
