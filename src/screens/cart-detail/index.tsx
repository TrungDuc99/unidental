/* eslint-disable max-lines-per-function */

import { useNavigation } from '@react-navigation/native';
import { AddCircle, CloseCircle, MinusCirlce } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectProductQuantity,
} from '@/feature/cart/cartSlice';
import type { ItemCart } from '@/types';
import { colors, Image, ScrollView, Text, TouchableOpacity, View } from '@/ui';
import ButtonLinear from '@/ui/core/button-linear';
const CartDetail = () => {
  const cart = useSelector(selectCartItems);
  const productAllQuantity = useSelector(selectProductQuantity);
  const total = useSelector(selectCartTotalPrice);
  const navigate = useNavigation();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = () => {
    setIsLoading(true);
  };
  useEffect(() => {
    if (cart.length === 0) {
      navigate.goBack();
    }
  }, [cart]);

  return (
    <View className="p-4">
      <View className="mb-5 flex flex-row items-center justify-between">
        <Text className="text-[20px] font-bold">Giỏ hàng</Text>
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
        >
          <CloseCircle variant="Bulk" size={40} color={colors.primary[500]} />
        </TouchableOpacity>
      </View>
      <View
        className="flex px-2 "
        style={{
          height: '73%',
        }}
      >
        <ScrollView>
          {cart.map((cartItem: ItemCart) => {
            return (
              <View
                key={cartItem.ProductId}
                className="mb-2 flex flex-row items-center justify-between "
              >
                <View className="flex flex-1 flex-row items-center">
                  <Image
                    source={
                      cartItem?.Picture?.[0]?.ImageUrl ||
                      cartItem?.Picture?.ImageUrl
                    }
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                    }}
                  />
                  <Text
                    variant="xs"
                    className="ml-2 flex flex-1 font-medium text-[#8E8E8E]"
                  >
                    {cartItem.ProductName}
                  </Text>
                </View>
                <View className="flex flex-row items-center ">
                  <TouchableOpacity
                    // disabled={cartItem.Quantity > 0 ? false : true}
                    onPress={() => {
                      dispatch(removeFromCart({ id: cartItem.Id }));
                    }}
                  >
                    <MinusCirlce
                      color={cartItem.Quantity > 0 ? '#007AFF' : '#637b94'}
                      variant="Bulk"
                    />
                  </TouchableOpacity>
                  <Text variant="xs" className="mx-2 font-bold ">
                    {cartItem.Quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        addToCart({
                          ...cartItem,
                        })
                      );
                    }}
                  >
                    <AddCircle color="#007AFF" variant="Bulk" />
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center">
                  <Text
                    variant="xs"
                    className="ml-2 font-medium text-[#8E8E8E]"
                  >
                    {cartItem.Quantity} x
                  </Text>
                  <Text
                    variant="xs"
                    className="ml-2 font-medium text-[#8E8E8E]"
                  >
                    {cartItem.UnitPriceValue}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View className="flex h-[18%] px-2">
        <View className="flex flex-row justify-between">
          <Text variant="sm" className="font-medium text-[#8E8E8E]">
            Tổng số lượng sản phẩm
          </Text>
          <Text variant="sm" className="font-medium  text-[#8E8E8E] ">
            {productAllQuantity}
          </Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text variant="sm" className="font-medium text-[#8E8E8E]">
            Loại sản phẩm
          </Text>
          <Text variant="sm" className="font-medium  text-[#8E8E8E] ">
            {cart.length}
          </Text>
        </View>
        {/* <View className="my-1 flex flex-row justify-between">
          <Text variant="sm" className="font-medium  text-[#8E8E8E] ">
            Phí giao hàng
          </Text>
          <Text variant="sm" className="font-medium  text-[#8E8E8E] ">
            12.000đ
          </Text>
        </View> */}
        <View className="mb-3 mt-2  flex flex-row justify-between ">
          <Text variant="sm" className="font-bold ">
            Tổng tiền
          </Text>
          <Text variant="sm" className="font-bold ">
            {total}đ
          </Text>
        </View>
        {/* <View className="mb-3 mt-2  flex flex-row justify-between ">
          <Text variant="sm" className="font-bold ">
            Phải thanh toán
          </Text>
          <Text variant="sm" className="font-bold ">
            {total + 12000}đ
          </Text>
        </View> */}
        <ButtonLinear
          loading={isLoading}
          borderRadius="medium"
          label="Thanh toán"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default CartDetail;
