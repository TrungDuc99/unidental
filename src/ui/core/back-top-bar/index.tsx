import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, ArrowLeft2 } from 'iconsax-react-native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native-ui-lib';
import { View } from 'react-native-ui-lib';

import { Colors, ScaleSize } from '@/configs';

import { Text } from '../text';
import { TouchableOpacity } from '../touchable-opacity';
import { SafeAreaView } from '../view';
interface BackTopBarProps extends ViewProps {
  title?: string;
  bgColor?: string;
  iconRight?: {
    icon?: any;
    onPress?: () => void;
  };
  pressBack?: () => void;
}
const BackTopBar = ({
  title,
  bgColor,
  iconRight,
  ...rest
}: BackTopBarProps) => {
  const Icon = iconRight?.icon;
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: bgColor ? bgColor : '#fff',
    },
    title: {
      width: '80%',
    },
  });
  const IconBack =
    Platform.select({
      ios: ArrowLeft2,
      android: ArrowLeft,
    }) || ArrowLeft;
  // const { navigate } = useNavigation();
  const handlePressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    // pressBack && pressBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar translucent backgroundColor={Colors.primaryColor} barStyle="default" /> */}
      <View {...rest} row centerV style={{ justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={handlePressBack}>
          <IconBack color={Colors.blackColor} size={ScaleSize(20)} />
        </TouchableOpacity>
        <Text
          variant="md"
          className="ios:font-medium android:font-bold"
          style={styles.title}
          children={title}
        />
        {iconRight && (
          <TouchableOpacity
            onPress={() => {
              iconRight && iconRight.onPress;
            }}
          >
            <Icon color={Colors.blackColor} size={ScaleSize(20)} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BackTopBar;
