/* eslint-disable max-lines-per-function */

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowDown2,
  Eye,
  Heart,
  MessageText,
  More,
} from 'iconsax-react-native';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { usePostsDetail } from '@/api/posts';
import { ScaleSize } from '@/configs';
import type { RouteProp } from '@/navigation/types';
import {
  colors,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';
import { renderBackdrop } from '@/ui/core/bottom-sheet';

import Comments from './comments';

const Post = () => {
  const { params } = useRoute<RouteProp<'Post'>>();

  const { data, isLoading, isError } = usePostsDetail(params.id);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { navigate } = useNavigation();
  const [visible, setIsVisible] = React.useState(false);

  const [liked, setLiked] = React.useState<number>(0);
  const optionsRef = React.useRef<BottomSheetModal>(null);
  const open = React.useCallback(() => optionsRef.current?.present(), []);
  const close = React.useCallback(() => optionsRef.current?.dismiss(), []);
  React.useEffect(() => {
    if (liked === 2) {
      const timer = setTimeout(() => {
        setLiked(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [liked]);

  return (
    <View className="flex-1">
      <BackTopBar marginB-2 title="Trạm Phát Sóng" iconRight={{ icon: More }} />
      <ScrollView className="mt-2   flex flex-1">
        <View className="mt-2">
          <View className="p-4 pt-0 ">
            <Text variant="md" numberOfLines={1} className="font-bold">
              {data?.data?.title ?? ''}
            </Text>
            <Text variant="xs" numberOfLines={3}>
              {data?.data.description}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => setIsVisible(true)}>
          <Image
            className="h-96 w-full object-cover "
            source={{
              uri: data?.data.image?.[0] ?? '',
            }}
          />
        </Pressable>
        <View className="my-3 mb-1 flex flex-row justify-between px-4">
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
                  <Lottie
                    style={{ height: ScaleSize(60) }}
                    source={require('@/assets/animation/heart-pressed.json')}
                    autoPlay
                    loop
                  />
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
          <Pressable onPress={() => {}} className="flex flex-row items-center">
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
        <View className="flex flex-row items-center px-3  ">
          <Heart size={20} color={'red'} variant="Bold" />
          <Text variant="sm" className="f ml-1 text-[#5A626A]">
            {data?.data.countLike} +{' '}
            {moment(data?.data?.created).format('DD/MM/YYYY : hh:mm')}
          </Text>
        </View>
        {/* Comment */}
        <TouchableOpacity className="px-4 py-2" onPress={open}>
          <View className="flex-row items-center">
            <Text className="mr-1 font-medium">Phù hợp nhất</Text>

            <ArrowDown2 size={20} color="black" />
          </View>
        </TouchableOpacity>
        <Comments />
      </ScrollView>
      <BottomSheetModal
        ref={optionsRef}
        index={0}
        snapPoints={['40%']}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: isDark ? colors.white : colors.charcoal[800],
        }}
        backgroundStyle={{
          backgroundColor: isDark ? colors.charcoal[950] : colors.white,
        }}
      >
        <View className=" item-center flex justify-center p-4 ">
          <TouchableOpacity onPress={close}>
            <Text className="font-medium" variant="md">
              Phù hợp nhất
            </Text>
            <Text
              className="mt-1 leading-[18px] text-charcoal-700"
              variant="sm"
            >
              Hiện thị Bình luận ccua3 bạn bè và những bình luận có nhiều tương
              tác
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={close} className="my-3">
            <Text className="font-medium" variant="md">
              Mới nhất
            </Text>
            <Text
              className="mt-1 leading-[18px] text-charcoal-700"
              variant="sm"
            >
              Hiện thị Bình luận ccua3 bạn bè và những bình luận có nhiều tương
              tác
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={close}>
            <Text className="font-medium" variant="md">
              Tất cả bình luận
            </Text>
            <Text
              className="mt-1 leading-[18px] text-charcoal-700"
              variant="sm"
            >
              Hiện thị Bình luận ccua3 bạn bè và những bình luận có nhiều tương
              tác
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
      <ImageView
        onLongPress={() => {}}
        images={[{ uri: data?.data.image?.[0] ?? '' }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default Post;
