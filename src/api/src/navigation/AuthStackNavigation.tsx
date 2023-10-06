import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '@screens/login-screen';
import React from 'react';

export type AuthStackParamList = {
  Login: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
