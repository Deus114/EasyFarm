import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/home/HomeScreen';

import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import VerifyOtpScreen from './screens/auth/VerifyOtpScreen';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen';

import ScheduleScreen from './screens/schedule/ScheduleScreen';
import AddScheduleScreen from './screens/schedule/AddScheduleScreen';
import ScheduleDetails from './screens/schedule/ScheduleDetails';

import SensorsScreen from './screens/sensors/SensorScreen';
import AddSensorScreen from './screens/sensors/AddSensorScreen';

import ForumScreen from './screens/forum/ForumScreen';
import PostScreen from './screens/forum/PostScreen';
import CreatePostScreen from './screens/forum/CreatePostScreen';
import DetailedPostScreen from './screens/forum/DetailedPostScreen';

import "./global.css"
import * as Sentry from '@sentry/react-native';

const Stack = createNativeStackNavigator();

Sentry.init({
  dsn: 'https://b0e5b3fc28a5c27ba8affce8f64f3a24@o4509285341921280.ingest.us.sentry.io/4509285526929408',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

function App() {
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      setIsFirstLaunch(hasLaunched !== 'true');
      setLoading(false);
    };
    checkFirstLaunch();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? "Onboarding" : "Login"}
      >
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : null}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="ScheduleDetails" component={ScheduleDetails}/>
        <Stack.Screen name="AddSchedule" component={AddScheduleScreen} />
        <Stack.Screen name="ViewSensor" component={SensorsScreen} />
        <Stack.Screen name="AddSensor" component={AddSensorScreen} />
        <Stack.Screen name="Forum" component={ForumScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="DetailedPost" component={DetailedPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

export default Sentry.wrap(App);