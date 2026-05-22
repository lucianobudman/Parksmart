# MapSection

# 📌 ¿Qué hace este componente?

Este componente contiene TODA la parte visual del mapa.

Es uno de los componentes más importantes de la aplicación.

Se encarga de mostrar:

- el mapa
- el vehículo
- los estacionamientos
- el destino
- la ruta dibujada

---

# 📁 Ubicación

```txt
src/components/MapSection.tsx
```

---

# 🧠 Código completo

```tsx
import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';

import CarMarker from './CarMarker';

type Props = {
  mapRef: any;

  location: any;

  heading: number;

  parkings: any[];

  selectedParking: any;

  routeCoords: any[];
};

export default function MapSection({
  mapRef,
  location,
  heading,
  parkings,
  selectedParking,
  routeCoords,
}: Props) {

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      showsUserLocation
      followsUserLocation
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >

      <CarMarker
        location={location}
        heading={heading}
      />

      {parkings.map((parking) => (

        <Marker
          key={parking.id}
          coordinate={{
            latitude: parking.lat,
            longitude: parking.lon,
          }}
          title={parking.tags?.name}
        />

      ))}

      {selectedParking && (

        <Marker
          coordinate={{
            latitude: selectedParking.lat,
            longitude: selectedParking.lon,
          }}
          pinColor="green"
          title="Destino"
        />

      )}

      {routeCoords.length > 0 && (

        <Polyline
          coordinates={routeCoords}
          strokeWidth={7}
          strokeColor="#2563eb"
        />

      )}

    </MapView>
  );
}
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import MapView, {
 Marker,
 Polyline,
} from 'react-native-maps';
```

---

# 🗺️ MapView

Es el mapa principal.

Todo lo que aparece visualmente en el mapa vive dentro de MapView.

---

# 📍 Marker

Sirve para colocar puntos en el mapa.

Ejemplos:

- parkings
- destino
- usuario

---

# 🛣️ Polyline

Dibuja líneas en el mapa.

En este proyecto:

- dibuja la ruta GPS

---

# 🚗 CarMarker

```tsx
import CarMarker from './CarMarker';
```

Importa el vehículo del usuario.

---

# 🧩 Props

```tsx
type Props = {
 mapRef: any;
 location: any;
 heading: number;
 parkings: any[];
 selectedParking: any;
 routeCoords: any[];
};
```

---

# 🗺️ mapRef

Referencia directa al mapa.

Permite:

- mover cámara
- hacer zoom
- animaciones

---

# 📍 location

Ubicación actual del usuario.

---

# 🧭 heading

Dirección del dispositivo.

---

# 🚗 parkings

Lista de estacionamientos.

---

# 🎯 selectedParking

Parking seleccionado.

---

# 🛣️ routeCoords

Lista de coordenadas de la ruta.

---

# 🖥️ MapView

```tsx
<MapView>
```

---

## ¿Qué hace?

Renderiza el mapa.

---

# 📍 initialRegion

```tsx
initialRegion={{
 latitude: location.latitude,
 longitude: location.longitude,
}}
```

---

## ¿Qué hace?

Define posición inicial del mapa.

---

# 🔍 latitudeDelta

Zoom vertical.

---

# 🔍 longitudeDelta

Zoom horizontal.

---

# 🚗 CarMarker

```tsx
<CarMarker
 location={location}
 heading={heading}
/>
```

---

## ¿Qué hace?

Muestra el vehículo del usuario.

---

# 🚗 parkings.map()

```tsx
parkings.map((parking) => (
```

---

## ¿Qué hace?

Recorre todos los parkings.

---

## map()

Es un loop.

Funciona parecido a:

```txt
para cada parking
↓
crear un Marker
```

---

# 📍 Marker parking

```tsx
<Marker
 coordinate={{
  latitude: parking.lat,
  longitude: parking.lon,
 }}
/>
```

---

## ¿Qué hace?

Dibuja un parking en el mapa.

---

# 🎯 selectedParking

```tsx
{selectedParking && (
```

---

## ¿Qué significa?

“Si existe un parking seleccionado”.

---

# 📍 Destino

```tsx
pinColor="green"
```

---

## ¿Qué hace?

Pinta el destino en verde.

---

# 🛣️ Polyline

```tsx
<Polyline
 coordinates={routeCoords}
/>
```

---

## ¿Qué hace?

Dibuja la ruta.

---

# 🎨 strokeWidth

Grosor de la línea.

---

# 🎨 strokeColor

Color de la ruta.

---

# 🔄 Flujo completo

```txt
Usuario abre app
↓
MapView carga
↓
GPS obtiene ubicación
↓
CarMarker aparece
↓
Parkings aparecen
↓
Usuario selecciona parking
↓
Ruta se calcula
↓
Polyline dibuja ruta
```