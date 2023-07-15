import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native-ui-lib';
import { View } from 'react-native-ui-lib';

import { Colors, ScaleSize, Spacing } from '@/configs';

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
const BackTopBar = ({ title, bgColor, ...rest }: BackTopBarProps) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: bgColor ? bgColor : '#fff',

      marginLeft: Platform.OS === 'ios' ? Spacing(-2) : Spacing(-1),
    },
    title: {
      width: '80%',
      marginLeft: -10,
    },
  });
  const IconBack =
    Platform.select({
      ios: ArrowLeft,
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
          <IconBack color={Colors.blackColor} size={ScaleSize(32)} />
        </TouchableOpacity>
        <Text
          variant="md"
          className="ios:font-medium android:font-bold"
          style={styles.title}
          children={title}
        />
      </View>
    </SafeAreaView>
  );
};

export default BackTopBar;
