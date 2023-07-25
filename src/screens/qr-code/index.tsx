/* eslint-disable max-lines-per-function */

import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

// import { RNCamera } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { ScaleSize } from '@/configs';
import { Screen, Text } from '@/ui';

export const QrCode = () => {
  // const [isTop, setIsTop] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [onFlash, setOnFlash] = useState(false);

  // const { navigate } = useNavigation();

  // const onPressNavigate = (event: any) => {
  //   navigate('ChatRoom', { id: chatRoom.id, name: user.name });
  // };

  // const scannerRef = useRef<any>(undefined);
  // const onSuccess = async () => {
  //   setLoading(true);
  //   try {
  //   } catch (error: any) {
  //     setLoading(false);
  //   }
  // };
  // const topMotion = useRef(new Animated.Value(0)).current;

  // const translateY = topMotion.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, ScaleSize(200)],
  //   extrapolate: 'clamp',
  // });
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     scannerRef.current.reactivate();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   Animated.timing(topMotion, {
  //     toValue: isTop ? 1 : 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setIsTop(!isTop);
  //   });
  // }, [isTop, topMotion]);

  return (
    <Screen>
      <Text>qr code</Text>
      {/* <QRCodeScanner
        ref={scannerRef}
        cameraStyle={styles.cameraContainer}
        // reactivate={hasScanned}
        customMarker={
          <View
            style={{
              width: ScaleSize(200),
              height: ScaleSize(200),
            }}
          >
            <Animated.View
              style={[styles.lineAnimateScand, { transform: [{ translateY }] }]}
            />
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
          </View>
        }
        showMarker
        vibrate
        onRead={onSuccess}
        flashMode={
          onFlash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />

      <View className="flex flex-row items-center justify-center p-4">
        <TouchableOpacity
          className="justify-center"
          style={styles.flash}
          onPress={() => setOnFlash((prev) => !prev)}
        >
          {!onFlash ? (
            <Flash color="#999" variant="Bold" />
          ) : (
            <FlashSlash color="#999" variant="Bold" />
          )}
        </TouchableOpacity>
        <Text className="text-[rgba(238,238,238,0.8)]">
          {!onFlash ? 'Nhấn để bật Flash' : 'Nhấn để tắt Flash'}
        </Text>
      </View>
      <View className="mb-4 justify-center">
        <ButtonBase
          loading={loading}
          marginT-20
          label="Rescan"
          onPress={() => {
            setLoading(true);
            try {
              scannerRef.current.reactivate();
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            } catch (error) {
              setLoading(false);
            }
          }}
        />
      </View>
      <View marginV-10 /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  lineAnimateScand: {
    height: ScaleSize(2),
    width: '100%',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
  topLeft: {
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderTopWidth: ScaleSize(2),
    borderLeftWidth: ScaleSize(2),
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderBottomWidth: ScaleSize(2),
    borderLeftWidth: ScaleSize(2),
    borderBottomColor: '#fff',
    borderLeftColor: '#fff',
  },
  topRight: {
    position: 'absolute',
    right: 0,
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderTopWidth: ScaleSize(2),
    borderRightWidth: ScaleSize(2),
    borderTopColor: '#fff',
    borderRightColor: '#fff',
  },
  bottomRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: ScaleSize(40),
    height: ScaleSize(40),
    borderBottomWidth: ScaleSize(2),
    borderRightWidth: ScaleSize(2),
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  flash: {
    backgroundColor: 'rgba(238,238,238,0.8)',
    width: ScaleSize(50),
    height: ScaleSize(50),
    borderRadius: 50,
  },
});
