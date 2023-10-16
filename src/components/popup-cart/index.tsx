import { useNavigation } from '@react-navigation/native';
import { Warning2 } from 'iconsax-react-native';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotalPrice,
  selectProductQuantity,
} from '@/feature/cart/cartSlice';
import { Text, TouchableOpacity, View } from '@/ui';

const CartPopup = () => {
  const cart = useSelector(selectCartItems);
  const { navigate } = useNavigation();
  const total = useSelector(selectCartTotalPrice);
  const productQuantity = useSelector(selectProductQuantity);
  const animation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (cart.length > 0) {
      showCart();
    } else {
      hideCart();
    }
  }, [cart.length]);
  const showCart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hideCart = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const containerStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };
  return (
    <>
      <Animated.View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          onPress={() => {
            navigate('CartDetail');
          }}
          className="mx-5 flex-row items-center justify-between space-x-1 rounded-lg bg-warning-500 px-4 py-1"
        >
          <View className="px-1  ">
            <Text variant="xs" className="text-[12px] font-medium text-white">
              Bạn có lịch hẹn tài khám
            </Text>
            <Text variant="md" className="font-semibold text-white">
              vào lúc 11:00 ngày 12/12/2024
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Warning2 color="white" size={30} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default CartPopup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    zIndex: 50,
    width: '100%',
  },
});
