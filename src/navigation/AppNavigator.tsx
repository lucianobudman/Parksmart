import {
  NavigationContainer,
} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';

import HomeScreen from '../screens/HomeScreen';

import useAuth from '../hooks/useAuth';

export default function AppNavigator() {

  const { user } =
    useAuth();

  return (
    <NavigationContainer>

      {user ? (
        <HomeScreen />
      ) : (
        <AuthNavigator />
      )}

    </NavigationContainer>
  );
}