/* eslint-disable max-lines-per-function */

import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { More, Refresh2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Colors, View } from 'react-native-ui-lib';

import { ScaleSize } from '@/configs';
import { useAuth } from '@/core';
import type { AuthStackParamList } from '@/navigation/auth-navigator';
import { Button, Text, TouchableOpacity } from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';

const InputOtp = () => {
  const { params } = useRoute<RouteProp<AuthStackParamList, 'InputOtp'>>();
  const { phoneNumber } = params;
  const { signIn } = useAuth();
  const { navigate } = useNavigation();
  const [countdownSencond, setCountdownSencond] = useState<any>(60);
  const [countdownMinute, setCountdownMinute] = useState<any>(1);

  const [message, setMessage] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);
  const [hash, setHash] = useState<string[] | null>([]);

  useEffect(() => {
    setTimeout(() => {
      if (countdownSencond > 0) {
        setCountdownSencond(countdownSencond - 1);
      } else if (countdownSencond === 0 && countdownMinute > 0) {
        setCountdownMinute(countdownMinute - 1);
        setCountdownSencond(60);
      }
    }, 1000);
  }, [countdownSencond]);

  const onSubmit = async (data: any) => {
    if (otp) {
      navigate('Login');
      // mutate(
      //   {
      //     data: {
      //       phone_number: to,
      //       otp: otp,
      //     },
      //   },
      //   {
      //     onSuccess: (res) => {
      //       setOtp('');
      //       setCountdownMinute(1);
      //       setCountdownSencond(60);
      //       navigate('Login');
      //     },
      //     onError: (error) => {
      //       setOtp(undefined);
      //       setCountdownMinute(0);
      //       setCountdownSencond(0);
      //     },
      //   }
      // );
    } else {
      Toast.show({
        type: 'error',
        text1: 'Số điện thoại không tồn tại trong hệ thống',
      });
    }
  };
  return (
    <View>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <BackTopBar marginB-2 title="Trở về" iconRight={{ icon: More }} />
        <View flex backgroundColor="#fff">
          <KeyboardAvoidingView behavior="position">
            <StatusBar
              barStyle="dark-content"
              backgroundColor={Colors.primaryColor}
            />
            <View style={{ alignItems: 'center' }} flex center>
              <View>
                <Text className="mt-2 mb-3 text-center font-extralight">
                  Mã xác thực
                </Text>

                <View row centerH centerV>
                  <Text
                    variant="xl"
                    className={`${
                      countdownMinute === 0 && countdownSencond === 0
                        ? 'text-primary-200'
                        : 'text-[#AEAEAE]'
                    } `}
                    // color={
                    //
                    // }
                  >
                    {`${countdownMinute > 0 ? countdownMinute : ''}${
                      countdownMinute > 0 ? ':' : ''
                    }${countdownSencond}`}
                  </Text>
                  <TouchableOpacity
                    className="ml-2"
                    disabled={
                      countdownMinute === 0 && countdownSencond === 0
                        ? false
                        : true
                    }
                    onPress={() => {
                      setCountdownMinute(1);
                      setCountdownSencond(60);
                    }}
                  >
                    <Refresh2
                      size="20"
                      color={
                        countdownMinute === 0 && countdownSencond === 0
                          ? Colors.primaryColor
                          : '#AEAEAE'
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View marginT-30 marginB-10>
                <Text className="font-extralight">
                  Mã xác thực OTP được gửi bằng SMS tới số
                </Text>
                <Text className="mt-2 mb-4 text-center font-bold">
                  {phoneNumber}
                </Text>
              </View>

              <OTPInputView
                style={{ height: 110, width: '80%', marginLeft: 3 }}
                pinCount={5}
                code={otp}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                  setOtp(code);
                }}
              />

              <View style={{ width: '70%', marginTop: 20 }}>
                <Button
                  loading={false}
                  disabled={otp?.length === 5 ? false : true}
                  onPress={onSubmit}
                  label="XÁC NHẬN"
                  size="large"
                  type="primary"
                  variant="primary"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default InputOtp;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 25,
    height: 35,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    fontSize: ScaleSize(60),

    color: '#1975EE',
    width: 50,
    height: 80,
    borderWidth: 0,
    borderBottomWidth: 2,
  },

  underlineStyleHighLighted: {},
});
