/* eslint-disable max-lines-per-function */

import { Eye, Heart, MessageText, More } from 'iconsax-react-native';
import Lottie from 'lottie-react-native';
import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { ScaleSize } from '@/configs';
import { Close, Image, Pressable, Text, TouchableOpacity, View } from '@/ui';
import { CardBase } from '@/ui/core/card-base';
import Divider from '@/ui/core/drivider';

type Props = any & { onPress?: () => void; navigate: any };

export const Card = ({ id, title, description, image, navigate }: Props) => {
  const [liked, setLiked] = React.useState<number>(0);
  const [visible, setIsVisible] = useState(false);
  React.useEffect(() => {
    if (liked === 2) {
      const timer = setTimeout(() => {
        setLiked(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [liked]);

  return (
    <CardBase className="mb-3" style={styles.postContainer}>
      <View className="flex flex-row items-center justify-between p-3">
        <View className="flex-row">
          <Image
            source={
              'https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/327349487_708770170890387_1850358938449352036_n.png?stp=cp0_dst-png_p80x80&_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_ohc=xhmkifGyv-QAX-QGgGY&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfCuJqpyi50VAbalZLOuZG3-5tM29yEMwSqQmcmnjYNNrw&oe=64C070D7'
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 1000,
            }}
          />
          <View className="ml-2 ">
            <Text variant="sm" className="font-semibold">
              Heineken 0.0
            </Text>
            <Text variant="xs" className="text-left  text-neutral-200">
              27 phút
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <More color={'#6B727C'} />
          <View className="mx-2" />
          <Close />
        </View>
      </View>
      <View>
        <View className="p-4 pt-0 ">
          <Text variant="md" numberOfLines={1} className="font-bold">
            {title}
          </Text>
          <Text variant="xs" numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => setIsVisible(true)}>
        <Image
          className="h-56 w-full object-cover "
          source={{
            uri: image,
          }}
        />
      </Pressable>
      <View className="flex flex-row items-center px-3 pt-2 pb-1">
        <Heart size={20} color={'red'} variant="Bold" />
        <Text variant="sm" className="f ml-1 text-[#5A626A]">
          99k
        </Text>
      </View>
      <Divider orientation={'horizontal'} color={'normal'} />
      <View className="flex flex-row justify-between px-4 ">
        <View className="flex flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              height: ScaleSize(40),
              width: ScaleSize(40),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (liked === 0) {
                setLiked(2);
              } else if (liked === 1) {
                setLiked(0);
              }
            }}
          >
            {liked === 2 ? (
              <View style={{}}>
                {Platform.OS === 'android' ? (
                  <Heart
                    size="27"
                    variant={liked === 1 ? 'Bold' : 'Outline'}
                    color={liked === 1 ? 'red' : '#5A626A'}
                  />
                ) : (
                  <Lottie
                    style={{ height: ScaleSize(60) }}
                    source={require('@/assets/animation/heart-pressed.json')}
                    autoPlay
                    loop
                  />
                )}
              </View>
            ) : (
              <Heart
                size="27"
                variant={liked === 1 ? 'Bold' : 'Outline'}
                color={liked === 1 ? 'red' : '#5A626A'}
              />
            )}
          </TouchableOpacity>
          <Text variant="sm" className="ml-2 font-semibold text-[#5A626A]">
            Thích
          </Text>
        </View>
        <Pressable
          onPress={() => {
            navigate('PostDetail', {
              id: id,
            });
          }}
          className="flex flex-row items-center"
        >
          <MessageText color={'#5A626A'} />
          <Text variant="sm" className="ml-2 font-semibold text-[#5A626A]">
            Bình luận
          </Text>
        </Pressable>
        <Pressable className="flex flex-row items-center">
          <Eye color={'#5A626A'} />
          <Text variant="sm" className="ml-2 font-semibold text-[#5A626A]">
            Xem
          </Text>
        </Pressable>
      </View>
      <ImageView
        onLongPress={() => {}}
        images={[{ uri: image }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </CardBase>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    borderRadius: 0,
  },
});
