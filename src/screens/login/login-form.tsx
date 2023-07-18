/* eslint-disable max-lines-per-function */

import { zodResolver } from '@hookform/resolvers/zod';
import auth from '@react-native-firebase/auth';
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Eye, EyeSlash } from 'iconsax-react-native';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import * as z from 'zod';
GoogleSignin.configure({
  webClientId:
    '37937252022-31gj0igc5dceog50u4b3oafh12in2t59.apps.googleusercontent.com',
  offlineAccess: false,
});
import { Constants, getUserProfile, login } from 'react-native-zalo-kit';

import { Spacing } from '@/configs';
import { Google, Image, Text, TouchableOpacity, View, Zalo } from '@/ui';
import ButtonLinear from '@/ui/core/button-linear';
import { CardBase } from '@/ui/core/card-base';
import Divider from '@/ui/core/drivider';
import { ControlledInputOutLine } from '@/ui/core/input-outline';
import { ScrollContainer } from '@/ui/core/scroll-keyboard-container';
import { Apple } from '@/ui/icons/apple';
import { Facebook } from '@/ui/icons/facebook';

//ios client id: 654996938317-fe762sfkltgoej8modh3b2rh5pna2un3.apps.googleusercontent.com
// android client id:654996938317-28bhirgi7n2goauick61dgjm1trkejv7.apps.googleusercontent.com
// Type                JKS
// Key Alias           5dfe757f3c924e5fe343a2df0073545a
// MD5 Fingerprint     43:B3:3C:07:37:2C:2D:5F:18:14:01:F3:E6:0E:9E:78
// SHA1 Fingerprint    33:E9:19:6E:B5:3E:7A:F8:E4:2C:15:4F:CD:EC:1D:80:FB:7F:36:87
// SHA256 Fingerprint  11:6C:75:42:0B:42:F7:29:9E:4F:9F:31:82:12:18:3A:BD:59:C1:2E:A5:16:2E:9D:15:8B:1E:E3:A8:0F:14:54
// SHA1 :5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:256
// package name : com.unidental.development
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
  const [state, setState] = useState();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const loginZalo = async () => {
    try {
      const oauthCode = await login(Constants.AUTH_VIA_APP_OR_WEB);
      console.log(oauthCode);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const userProfile = await getUserProfile();
      console.log(userProfile);
    } catch (error) {
      console.log(error);
    }
  };
  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const accessToken = data.accessToken;
    const graphRequestParams = {
      parameters: {
        fields: {
          string: 'id,name,email,picture.type(large)', // Chỉ lấy id, tên, email và ảnh đại diện
        },
        access_token: {
          string: accessToken.toString(),
        },
      },
    };
    const graphRequest = new GraphRequest(
      '/me',
      graphRequestParams,
      (error, result: any) => {
        if (error) {
          console.log('Lỗi khi lấy thông tin người dùng: ' + error.toString());
        } else {
          console.log('Thông tin người dùng: ' + JSON.stringify(result));
          const profilePictureURL = result.picture.data.url;
          console.log('Ảnh đại diện: ' + profilePictureURL);
        }
      }
    );
    new GraphRequestManager().addRequest(graphRequest).start();
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      return userInfo;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow.
        console.log('Google sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g. sign in) is in progress already.
        console.log('Google sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated.
        console.log('Play services not available');
      } else {
        // Some other error happened.
        console.log('Error occurred while signing in with Google', error);
      }
    }
  };

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
        {/* <LoginButton
          onLoginFinished={(error: any, result: any) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data: any) => {
                const accessToken = data.accessToken;
                // Gọi API để lấy thông tin người dùng
                const graphRequestParams = {
                  parameters: {
                    fields: {
                      string: 'id,name,email,picture.type(large)', // Chỉ lấy id, tên, email và ảnh đại diện
                    },
                    access_token: {
                      string: accessToken.toString(),
                    },
                  },
                };
                const graphRequest = new GraphRequest(
                  '/me',
                  graphRequestParams,
                  (error, result: any) => {
                    if (error) {
                      console.log(
                        'Lỗi khi lấy thông tin người dùng: ' + error.toString()
                      );
                    } else {
                      console.log(
                        'Thông tin người dùng: ' + JSON.stringify(result)
                      );

                      // Ảnh đại diện nằm trong thuộc tính picture.data.url
                      const profilePictureURL = result.picture.data.url;
                      console.log('Ảnh đại diện: ' + profilePictureURL);
                    }
                  }
                );

                new GraphRequestManager().addRequest(graphRequest).start();
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        /> */}
        <View className="mb-10 flex flex-row items-center justify-between px-3">
          <CardBase className=" px-4 py-1" onPress={onFacebookButtonPress}>
            <Facebook />
          </CardBase>
          <CardBase className=" px-4  py-1" onPress={signInWithGoogle}>
            <Google />
          </CardBase>
          <CardBase className=" px-4  py-1" onPress={() => {}}>
            <Apple />
          </CardBase>
          <CardBase className="  px-4  py-1" onPress={loginZalo}>
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

const google = {
  idToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3NmRhOWQzMTJjMzlhNDI5OTMyZjU0M2U2YzFiNmU2NTEyZTQ5ODMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNzkzNzI1MjAyMi1tZTQ5cWtvODU1NHRubnF0cWNmOWcwYmJvNWc1ZTRlay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjM3OTM3MjUyMDIyLTMxZ2owaWdjNWRjZW9nNTB1NGIzb2FmaDEyaW4ydDU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1MTc2NTE1NTYyMTg1MjIyNjUwIiwiZW1haWwiOiJkb3RydW5nZHVjLmJsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoixJDhu6hDIMSQ4buWIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGNpUnFSd0tSR241MmNod3dxRFEtQzVmUWhENDFrUl9YVl83VHYtaDg1Tz1zOTYtYyIsImdpdmVuX25hbWUiOiLEkOG7qEMiLCJmYW1pbHlfbmFtZSI6IsSQ4buWIiwibG9jYWxlIjoidmkiLCJpYXQiOjE2ODk1MTY4NTUsImV4cCI6MTY4OTUyMDQ1NX0.jZICtb_5YdWLltQvKmEBMrxgJHqC07ohxRpAbaTD8xbQD30qncQkveUXDqOdsoNUjFicMVWIoFoxhHRqUxUYuq-XD-DeAejrJ0KxuG5bzxdQcqJ3GJpRHKH-1EXJf_pcIvveM1AVddTDqZCKumxi-Gp1Ly24MEtQSbWoH_k_heevIExgI7dFM3JSM5q_K7aACuMJ2yh9f9pAVHXaMCLSimJQLD9ofWZEoZ57Wo82qv0ZvtzRxufUbVm_NYyHo6xcJP6Qh1LA1bo1UIbpyMX0_s_EWW3KhElgiblkS04FIQ3szCTBhStTKI_cvItbaCh5V4VYQ5t4OaNMj_gi-P6UGg',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  serverAuthCode: null,
  user: {
    email: 'dotrungduc.bl@gmail.com',
    familyName: 'ĐỖ',
    givenName: 'ĐỨC',
    id: '115176515562185222650',
    name: 'ĐỨC ĐỖ',
    photo:
      'https://lh3.googleusercontent.com/a/AAcHTtciRqRwKRGn52chwwqDQ-C5fQhD41kR_XV_7Tv-h85O=s96-c',
  },
};
const fb = {
  email: 'ducga0ro1234@gmail.com',
  id: '1312341403038732',
  name: 'Trung Đức',
  picture: {
    data: {
      height: 200,
      is_silhouette: false,
      url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1312341403038732&height=200&width=200&ext=1692110156&hash=AeTTOxmtB4yQY1Chk6I',
      width: 200,
    },
  },
};
const zalo = {
  birthday: '01/01/1970',
  error: 0,
  extCode: 0,
  gender: '',
  id: '5985380944488502824',
  is_sensitive: false,
  message: 'Success',
  name: 'Đức',
  picture: {
    data: {
      url: 'https://s120-ava-talk.zadn.vn/8/4/0/8/20/120/d187fcf29c913261f1c6341f182ecb4c.jpg',
    },
  },
};
