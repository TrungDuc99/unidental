/* eslint-disable max-lines-per-function */

import { zodResolver } from '@hookform/resolvers/zod';
// import statusCodes along with GoogleSignin
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Eye, EyeSlash } from 'iconsax-react-native';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
GoogleSignin.configure({
  webClientId:
    '37937252022-31gj0igc5dceog50u4b3oafh12in2t59.apps.googleusercontent.com',
  offlineAccess: false,
});
import { useDispatch } from 'react-redux';

import { useAuth, useLoading } from '@/core';
import { Image, View } from '@/ui';
import ButtonLinear from '@/ui/core/button-linear';
import { ControlledInputOutLine } from '@/ui/core/input-outline';
import { ScrollContainer } from '@/ui/core/scroll-keyboard-container';
//ios client id: 654996938317-fe762sfkltgoej8modh3b2rh5pna2un3.apps.googleusercontent.com
// android client id:654996938317-28bhirgi7n2goauick61dgjm1trkejv7.apps.googleusercontent.com
// Type                JKS
// Key Alias           5dfe757f3c924e5fe343a2df0073545a
// MD5 Fingerprint     43:B3:3C:07:37:2C:2D:5F:18:14:01:F3:E6:0E:9E:78
// SHA1 Fingerprint    33:E9:19:6E:B5:3E:7A:F8:E4:2C:15:4F:CD:EC:1D:80:FB:7F:36:87
// SHA256 Fingerprint  11:6C:75:42:0B:42:F7:29:9E:4F:9F:31:82:12:18:3A:BD:59:C1:2E:A5:16:2E:9D:15:8B:1E:E3:A8:0F:14:54
// SHA1 :5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:256

// --- check phone number ---
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const checkPasswordValid = new RegExp(
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
);
const schema = z
  .object({
    userName: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

export type FormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading?: boolean;
};

export const RegisterForm = ({
  onSubmit = () => {},
  isLoading,
}: RegisterFormProps) => {
  const [isShowPw, setIsShowPw] = useState<boolean>(true);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const signIn = useAuth.use.signIn();
  const dispatch = useDispatch();
  const setLoading = useLoading.use.setLoading();

  return (
    <View>
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
              marginTop: 100,
              width: '100%',
              height: 100,
            }}
            source={{
              uri: 'http://nhakhoauni.com/wp-content/uploads/2023/05/wedsite-logo-01-1-scaled.jpg',
            }}
          />
          <ControlledInputOutLine
            testID="userName-input"
            control={control}
            name="userName"
            size="small"
            label="Họ Tên"
            placeholder=" Nhập họ tên"
          />
          <ControlledInputOutLine
            testID="email-input"
            control={control}
            name="phone"
            size="small"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />
          <ControlledInputOutLine
            testID="email-input"
            control={control}
            name="email"
            label="Email"
            size="small"
            placeholder="Nhập Email"
          />

          <ControlledInputOutLine
            testID="password-input"
            control={control}
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            size="small"
            secureTextEntry={isShowPw}
            iconRight={{
              name: isShowPw ? Eye : EyeSlash,
              onPress: () => setIsShowPw((prev) => !prev),
            }}
          />
          <ControlledInputOutLine
            testID="password-input"
            control={control}
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            label="Xác nhận mật khẩu"
            size="small"
            secureTextEntry={isShowPw}
            iconRight={{
              name: isShowPw ? Eye : EyeSlash,
              onPress: () => setIsShowPw((prev) => !prev),
            }}
          />
          <ButtonLinear
            borderRadius="medium"
            loading={isLoading}
            testID="register-button"
            size="small"
            label="XÁC NHẬN"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
          />
        </View>
      </ScrollContainer>
    </View>
  );
};
