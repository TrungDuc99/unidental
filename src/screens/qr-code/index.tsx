import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import { Text, View } from '@/ui';
export const QrCode = () => {
  // const [hasPermission, setHasPermission] = React.useState(false);
  // const devices = useCameraDevices();
  // const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });

  // // Alternatively you can use the underlying function:
  // //
  // // const frameProcessor = useFrameProcessor((frame) => {
  // //   'worklet';
  // //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  // //   runOnJS(setBarcodes)(detectedBarcodes);
  // // }, []);

  // React.useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     setHasPermission(status === 'authorized');
  //   })();
  // }, []);
  const devices = useCameraDevices();
  const device = devices.back;

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
