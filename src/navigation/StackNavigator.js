import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreenView from '../components/SplashScreenView';
import GetStarted from '../components/GetStarted';
import CredsLogin from '../components/CredsLogin';
import SignUp from '../components/SignUp';
import PasswordLogin from '../components/PasswordLogin';
import UserProfile from '../components/UserProfile';
import ForgotPassword from '../components/ForgotPassword';
import ForgotDigitCode from '../components/ForgotDigitCode';
import NewPassword from '../components/NewPassword';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreenView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CredsLogin"
        component={CredsLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordLogin"
        component={PasswordLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EnterCode"
        component={ForgotDigitCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenerateNewPass"
        component={NewPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
