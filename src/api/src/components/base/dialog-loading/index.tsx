import {ScaleSize} from '@configs';
import Lottie from 'lottie-react-native';
import React from 'react';
import {Dialog, View} from 'react-native-ui-lib';

interface DialogP {
  isShow?: boolean;
}

const DialogLoading = ({isShow = false}: DialogP) => {
  return (
    <Dialog visible={isShow} ignoreBackgroundPress={true}>
      <View centerV centerH>
        <View
          centerV
          centerH
          backgroundColor="#fff"
          style={{
            borderRadius: 5,
          }}
        >
          <Lottie
            style={{height: ScaleSize(80)}}
            source={require('@assets/animation/loading.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    </Dialog>
  );
};

export default DialogLoading;