/* eslint-disable max-lines-per-function */

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from 'iconsax-react-native';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Spacing } from '@/configs';
import { Google, Image, Text, TouchableOpacity, View, Zalo } from '@/ui';
import ButtonLinear from '@/ui/core/button-linear';
import { CardBase } from '@/ui/core/card-base';
import Divider from '@/ui/core/drivider';
import { ControlledInputOutLine } from '@/ui/core/input-outline';
import { ScrollContainer } from '@/ui/core/scroll-keyboard-container';
import { Apple } from '@/ui/icons/apple';
import { Facebook } from '@/ui/icons/facebook';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading?: boolean;
};

export const LoginForm = ({
  onSubmit = () => {},
  isLoading,
}: LoginFormProps) => {
  const [isShowPw, setIsShowPw] = useState<boolean>(true);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <ScrollContainer>
      <View className="flex flex-1  p-5 ">
        <View
          style={{
            bottom: 220,
            left: 1,
          }}
          className="absolute h-[150] w-[150] rounded-full bg-[#D3EFFF]"
        />
        <View
          style={{
            top: -40,
            right: 1,
          }}
          className=" absolute h-[200] w-[200] rounded-full bg-[#D3EFFF]"
        />

        <Image
          style={{
            marginTop: 150,
            width: '100%',
            height: 100,
            marginBottom: Spacing(15),
          }}
          source={{
            uri: 'http://nhakhoauni.com/wp-content/uploads/2023/05/wedsite-logo-01-1-scaled.jpg',
          }}
        />

        <ControlledInputOutLine
          testID="email-input"
          control={control}
          name="email"
          size="small"
          placeholder="Nhập Email"
        />
        <ControlledInputOutLine
          testID="password-input"
          control={control}
          name="password"
          placeholder="nhập mật khẩu"
          size="small"
          secureTextEntry={isShowPw}
          iconRight={{
            name: isShowPw ? Eye : EyeSlash,
            onPress: () => setIsShowPw((prev) => !prev),
          }}
        />

        <View className="mb-5 flex flex-row justify-between">
          <View />
          <TouchableOpacity>
            <Text className="text-right font-medium" variant="xs">
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <ButtonLinear
          borderRadius="medium"
          loading={isLoading}
          testID="login-button"
          size="small"
          label="Login"
          onPress={handleSubmit(onSubmit)}
          variant="primary"
        />
        <View className="my-10 flex-row items-center justify-center">
          <Divider orientation={'horizontal'} width={120} />
          <Text variant="xs" className="mx-2">
            Or sign up with
          </Text>
          <Divider orientation={'horizontal'} width={120} />
        </View>
        <View />

        <View className="mb-10 flex flex-row items-center justify-between px-3">
          <CardBase className=" px-4 py-1" onPress={() => {}}>
            <Facebook />
          </CardBase>
          <CardBase className=" px-4  py-1" onPress={() => {}}>
            <Google />
          </CardBase>
          <CardBase className=" px-4  py-1" onPress={() => {}}>
            <Apple />
          </CardBase>
          <CardBase className="  px-4  py-1" onPress={() => {}}>
            <Zalo />
          </CardBase>
        </View>
        <View className="flex-row items-center justify-center">
          <Text variant="sm" className="mx-2">
            Not register yet ?{' '}
            <Text variant="sm" className="font-bold">
              Create Account
            </Text>
          </Text>
        </View>
      </View>
    </ScrollContainer>
  );
};
