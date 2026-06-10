import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isLogin ? 'Login' : 'Register'}
    >
      <Stack.Screen
        name="Login"
        options={{
          animationEnabled: false,
        }}
      >
        {(props) => (
          <LoginScreen {...props} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        options={{
          animationEnabled: false,
        }}
      >
        {(props) => (
          <RegisterScreen {...props} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
