import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@react-native-google-signin/google-signin';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import { useAddPost } from '@/api/posts';
import { selectUserInfo } from '@/feature/user/userSlice';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';

const schema = z.object({
  title: z.string().min(10),
  body: z.string().min(120),
});

type FormType = z.infer<typeof schema>;

export const AddPost = () => {
  const userInfo: User = useSelector(selectUserInfo);

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addPost, isLoading } = useAddPost();

  const onSubmit = (data: FormType) => {
    addPost(
      { ...data, userId: userInfo.user.id },
      {
        onSuccess: () => {
          showMessage({
            message: 'Post added successfully',
            type: 'success',
          });
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
      <ControlledInput name="title" label="Tasdsitle" control={control} />
      <ControlledInput
        name="body"
        label="Content"
        control={control}
        multiline
      />
      <ControlledInput
        name="body"
        label="Content"
        control={control}
        multiline
      />
      <ControlledInput
        name="body"
        label="Content"
        control={control}
        multiline
      />
      <ControlledInput
        name="body"
        label="Content"
        control={control}
        multiline
      />
      <ControlledInput
        name="body"
        label="Content"
        control={control}
        multiline
      />
      <Button
        label="Add Post"
        loading={false}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
