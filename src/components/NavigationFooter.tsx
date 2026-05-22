import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import * as Speech from 'expo-speech';

export default function NavigationFooter(
  props: any
) {

  return (
    <View style={styles.footer}>

      <Text style={styles.eta}>
        ⏱ {props.eta || 0} min
      </Text>

      <Text style={styles.instruction}>
        {props.currentInstruction}
      </Text>

      <Text style={styles.steps}>
        Paso:
        {' '}
        {props.currentStepIndex + 1}
        {' / '}
        {props.navigationSteps.length}
      </Text>

      <TouchableOpacity
        style={styles.button}

        onPress={() => {

          Speech.stop();

          props.setNavigationMode(
            false
          );

          props.setSelectedParking(
            null
          );

          props.setRouteCoords([]);

          props.setEta(null);

          props.setNavigationSteps([]);

          props.setCurrentStepIndex(0);

          props.setLastSpokenStep(-1);

        }}
      >

        <Text style={styles.buttonText}>
          Finalizar navegación
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  footer: {

    position: 'absolute',

    bottom: 0,

    width: '100%',

    backgroundColor: '#111827',

    padding: 25,

    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,
  },

  eta: {

    color: 'white',

    fontSize: 32,

    fontWeight: '700',
  },

  instruction: {

    color: 'white',

    marginTop: 10,

    fontSize: 18,
  },

  steps: {

    color: 'white',

    marginTop: 10,
  },

  button: {

    marginTop: 20,

    backgroundColor: '#2563eb',

    padding: 15,

    borderRadius: 15,

    alignItems: 'center',
  },

  buttonText: {

    color: 'white',

    fontWeight: '700',
  },
});