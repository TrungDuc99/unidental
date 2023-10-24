import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import { useAddPost } from '@/api/posts';
import type { User } from '@/api/user/types';
import { selectUserInfo } from '@/feature/user/userSlice';
import { ControlledInput, showErrorMessage, View } from '@/ui';
import ButtonLinear from '@/ui/core/button-linear';

const schema = z.object({
  title: z.string().min(10),
  content: z.string().max(300),
  description: z.string().max(100),
});

type FormType = z.infer<typeof schema>;

export const AddPost = () => {
  const userInfo: User = useSelector(selectUserInfo);
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addPost, isLoading } = useAddPost();
  console.log({ userInfo });

  const onSubmit = (data: FormType) => {
    addPost(
      { ...data, userId: userInfo._id },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Bài đã được đăng thành công',
          });
          navigation.goBack();
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error adding post');
        },
      }
    );
  };
  return (
    <View className="flex-1 p-4 ">
      <ControlledInput name="title" label="Tiêu đề" control={control} />
      <ControlledInput
        name="description"
        label="Mô tả "
        control={control}
        multiline
      />
      <ControlledInput
        name="content"
        label="Content"
        control={control}
        multiline
      />

      <ButtonLinear
        borderRadius="medium"
        loading={isLoading}
        testID="login-button"
        size="small"
        label="Xác nhận"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
      />
    </View>
  );
};
