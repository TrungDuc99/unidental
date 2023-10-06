import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import { Text, View } from '@/ui';
export const QrCode = () => {
  const [hasPermission, setHasPermission] = React.useState(false);

  const devices = useCameraDevices();
  const device = devices.back;

  React.useEffect(() => {
    if (!hasPermission) {
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
    }
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (device == null)
    return (
      <View>
        <Text>device == null</Text>
      </View>
    );
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    // device != null &&
    // hasPermission && (
    //   <>
    //     <Camera
    //       style={StyleSheet.absoluteFill}
    //       device={device}
    //       isActive={true}
    //       frameProcessor={frameProcessor}
    //       frameProcessorFps={5}
    //     />
    //     {barcodes.map((barcode, idx) => (
    //       <Text key={idx} style={styles.barcodeTextURL}>
    //         {barcode.displayValue}
    //       </Text>
    //     ))}
    //   </>
    // )
  );
};

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
