import {
  useEffect,
  useState,
  useRef,
} from 'react';

import * as Location from 'expo-location';

import * as Speech from 'expo-speech';

import { Alert } from 'react-native';

import MapView from 'react-native-maps';

import {
  fetchFakeParkings,
} from '../services/parkingService';

import {
  getRouteData,
} from '../services/routeService';

import {
  isNearCoordinate,
} from '../utils/navigationUtils';

import {
  speakInstruction,
} from '../utils/speech';

import {
  Parking,
  Coordinate,
} from '../types/parking';

export default function useNavigation() {

  const [location, setLocation] =
    useState<Coordinate | null>(null);

  const [parkings, setParkings] =
    useState<Parking[]>([]);

  const [
    selectedParking,
    setSelectedParking,
  ] = useState<Parking | null>(null);

  const [routeCoords, setRouteCoords] =
    useState<any[]>([]);

  const [eta, setEta] =
    useState<number | null>(null);

  const [
    currentInstruction,
    setCurrentInstruction,
  ] = useState(
    'Selecciona un estacionamiento'
  );

  const [
    navigationMode,
    setNavigationMode,
  ] = useState(false);

  const [heading, setHeading] =
    useState(0);

  const [
    navigationSteps,
    setNavigationSteps,
  ] = useState<any[]>([]);

  const [
    currentStepIndex,
    setCurrentStepIndex,
  ] = useState(0);

  const [
    lastSpokenStep,
    setLastSpokenStep,
  ] = useState(-1);

  const [loadingRoute, setLoadingRoute] =
    useState(false);

  const mapRef =
    useRef<MapView>(null);

  // =========================
  // GET ROUTE
  // =========================

  const getRoute = async (
    dest: Parking
  ) => {

    if (!location) return;

    setLoadingRoute(true);

    try {

      const data =
        await getRouteData(
          location,
          dest
        );

      if (!data.routes?.length) {

        Alert.alert(
          'Error',
          'No se encontró ruta'
        );

        return;
      }

      const route =
        data.routes[0];

      const coords =
        route.geometry.coordinates.map(
          ([lng, lat]: number[]) => ({
            latitude: lat,
            longitude: lng,
          })
        );

      setRouteCoords(coords);

      setEta(
        Math.round(
          route.duration / 60
        )
      );

      const steps =
        route.legs[0].steps;

      setNavigationSteps(steps);

      setCurrentStepIndex(0);

      setLastSpokenStep(0);

      if (steps.length > 0) {

        const firstInstruction =
          steps[0].maneuver
            .instruction ||
          'Navegando';

        setCurrentInstruction(
          firstInstruction
        );

        speakInstruction(
          firstInstruction
        );
      }

      mapRef.current?.fitToCoordinates(
        coords,
        {
          edgePadding: {
            top: 200,
            right: 80,
            bottom: 300,
            left: 80,
          },
          animated: true,
        }
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo calcular ruta'
      );

    } finally {

      setLoadingRoute(false);

    }
  };

  // =========================
  // LOCATION
  // =========================

  useEffect(() => {

    let subscriber: any;

    (async () => {

      try {

        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {

          Alert.alert(
            'Permiso necesario',
            'Debes permitir ubicación'
          );

          return;
        }

        const initialLocation =
          await Location.getCurrentPositionAsync({
            accuracy:
              Location.Accuracy.High,
          });

        const current = {
          latitude:
            initialLocation.coords.latitude,

          longitude:
            initialLocation.coords.longitude,
        };

        setLocation(current);

        // =========================
        // PARKINGS
        // =========================

        const fake =
          fetchFakeParkings(
            current.latitude,
            current.longitude
          );

        setParkings(fake);

        // =========================
        // REALTIME GPS
        // =========================

        subscriber =
          await Location.watchPositionAsync(
            {
              accuracy:
                Location.Accuracy.High,

              timeInterval: 2000,

              distanceInterval: 5,
            },

            async (loc) => {

              const currentPosition = {
                latitude:
                  loc.coords.latitude,

                longitude:
                  loc.coords.longitude,
              };

              setLocation(
                currentPosition
              );

              // =========================
              // STEP NAVIGATION
              // =========================

              if (
                navigationSteps.length > 0 &&
                currentStepIndex <
                  navigationSteps.length
              ) {

                const currentStep =
                  navigationSteps[
                    currentStepIndex
                  ];

                const stepLocation =
                  currentStep.maneuver.location;

                const stepLon =
                  stepLocation[0];

                const stepLat =
                  stepLocation[1];

                const reached =
                  isNearCoordinate(
                    currentPosition.latitude,
                    currentPosition.longitude,
                    stepLat,
                    stepLon
                  );

                if (reached) {

                  const nextIndex =
                    currentStepIndex + 1;

                  if (
                    nextIndex <
                    navigationSteps.length
                  ) {

                    setCurrentStepIndex(
                      nextIndex
                    );

                    const nextStep =
                      navigationSteps[
                        nextIndex
                      ];

                    const nextInstruction =
                      nextStep.maneuver
                        .instruction ||
                      'Continúa recto';

                    setCurrentInstruction(
                      nextInstruction
                    );

                    if (
                      lastSpokenStep !==
                      nextIndex
                    ) {

                      speakInstruction(
                        nextInstruction
                      );

                      setLastSpokenStep(
                        nextIndex
                      );
                    }
                  }
                }
              }

              // =========================
              // CAR ROTATION
              // =========================

              setHeading(
                loc.coords.heading || 0
              );

              // =========================
              // CAMERA
              // =========================

              mapRef.current?.animateCamera({
                center:
                  currentPosition,

                pitch: 60,

                heading:
                  loc.coords.heading ||
                  0,

                zoom: 18,
              });

            }
          );

      } catch (error) {

        console.log(error);

        Alert.alert(
          'Error',
          'No se pudo obtener ubicación'
        );
      }

    })();

    return () => {
      subscriber?.remove();
      Speech.stop();
    };

  }, []);

  return {
    mapRef,
    location,
    parkings,
    selectedParking,
    setSelectedParking,
    routeCoords,
    eta,
    currentInstruction,
    navigationMode,
    setNavigationMode,
    heading,
    currentStepIndex,
    navigationSteps,
    loadingRoute,
    getRoute,
    setRouteCoords,
    setEta,
    setNavigationSteps,
    setCurrentStepIndex,
    setLastSpokenStep,
  };
}