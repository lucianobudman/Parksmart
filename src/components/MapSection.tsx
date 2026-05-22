import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';

import mapStyle from '../styles/mapStyle';

import CarMarker from './CarMarker';

export default function MapSection(
  props: any
) {

  return (
    <MapView
      ref={props.mapRef}
      style={{ flex: 1 }}
      customMapStyle={mapStyle}
      followsUserLocation
      initialRegion={{
        latitude:
          props.location.latitude,

        longitude:
          props.location.longitude,

        latitudeDelta: 0.02,

        longitudeDelta: 0.02,
      }}
    >

      <CarMarker
        location={props.location}
        heading={props.heading}
      />

      {props.parkings.map(
        (parking: any) => (
          <Marker
            key={parking.id}
            coordinate={{
              latitude:
                parking.lat,

              longitude:
                parking.lon,
            }}

            title={
              parking.tags?.name
            }
          />
        )
      )}

      {props.selectedParking && (
        <Marker
          coordinate={{
            latitude:
              props.selectedParking.lat,

            longitude:
              props.selectedParking.lon,
          }}

          pinColor="green"

          title="Destino"
        />
      )}

      {props.routeCoords.length > 0 && (
        <Polyline
          coordinates={
            props.routeCoords
          }

          strokeWidth={7}

          strokeColor="#2563eb"
        />
      )}

    </MapView>
  );
}