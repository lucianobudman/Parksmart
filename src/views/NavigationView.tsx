import {
  View,
  StyleSheet,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import NavigationPanel from '../components/NavigationPanel';

import MapSection from '../components/MapSection';

import ParkingBottomSheet from '../components/ParkingBottomSheet';

import NavigationFooter from '../components/NavigationFooter';

export default function NavigationView(
  props: any
) {

  return (
    <View style={styles.container}>

      <NavigationPanel
        instruction={
          props.currentInstruction
        }
        eta={props.eta}
      />

      <MapSection {...props} />

      {!props.navigationMode ? (
        <ParkingBottomSheet
          {...props}
        />
      ) : (
        <NavigationFooter
          {...props}
        />
      )}

      <StatusBar style="light" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});