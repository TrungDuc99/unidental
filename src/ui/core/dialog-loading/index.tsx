import Lottie from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, View } from 'react-native-ui-lib';

import { ScaleSize } from '@/configs';
interface DialogP {
  isShow?: boolean;
}

const DialogLoading = ({ isShow = false }: DialogP) => {
  return (
    <Dialog
      visible={isShow}
      onTouchOutside={() => false}
      ignoreBackgroundPress={true}
      containerStyle={[styles.dialog]}
    >
      <View centerV centerH>
        <View
          centerV
          centerH
          padding-10
          width={100}
          backgroundColor="#fff"
          style={{
            borderRadius: 5,
          }}
        >
          <Lottie
            style={{ height: ScaleSize(60) }}
            source={require('@/assets/animation//loading-circle.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    </Dialog>
  );
};

export default DialogLoading;

const styles = StyleSheet.create({
  dialog: {},
});
