import LoadingScreen from '../components/LoadingScreen';

import NavigationView from '../views/NavigationView';

import useNavigation from '../hooks/useNavigation';

export default function HomeScreen() {

  const navigation =
    useNavigation();

  if (!navigation.location) {
    return <LoadingScreen />;
  }

  return (
    <NavigationView
      {...navigation}
    />
  );
}