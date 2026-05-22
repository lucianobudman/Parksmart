# 🚗 ParkSmart Navigation App

Aplicación mobile desarrollada con React Native + Expo que permite:

* detectar la ubicación del usuario en tiempo real
* mostrar estacionamientos cercanos
* calcular rutas reales
* navegación integrada dentro de la app
* instrucciones por voz
* modo conducción estilo GPS
* mapa oscuro tipo Uber/Waze

---

# 📸 Features

✅ GPS en tiempo real
✅ Navegación turn-by-turn
✅ Voz integrada
✅ Ruta dinámica
✅ Auto animado según dirección
✅ ETA (tiempo estimado)
✅ Modo navegación fullscreen
✅ Arquitectura modular profesional
✅ Compatible con Android y Expo Go

---

# 🛠 Tecnologías utilizadas

* React Native
* Expo
* TypeScript
* react-native-maps
* expo-location
* expo-speech
* OpenStreetMap
* OSRM Routing API

---

# 📁 Estructura del proyecto

```txt
src
|
├── components
├── hooks
├── screens
├── services
├── styles
├── types
├── utils
└── views
```

---

# 📦 Instalación

## 1. Clonar repositorio

```bash
git clone URL_DEL_REPO
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Instalar dependencias Expo

```bash
npx expo install
```

---

## 4. Ejecutar proyecto

```bash
npx expo start
```

---

# 📱 Ejecutar en celular

1. Instalar Expo Go
2. Escanear QR
3. Permitir ubicación GPS

---

# 🔊 Voz GPS

La aplicación utiliza:

```txt
expo-speech
```

para reproducir instrucciones de navegación similares a Google Maps.

---

# 🗺 API Routing

Se utiliza:

```txt
OSRM + OpenStreetMap
```

para:

* calcular rutas
* obtener instrucciones
* ETA
* navegación turn-by-turn

---

# 🚀 Próximas mejoras

* detección de llegada
* recalcular ruta automática
* velocidad en vivo
* login y backend
* favoritos
* parking real desde API
* modo 3D avanzado
* simulador de conducción
* soporte iOS completo

---

# 📚 Explicación detallada del código

---

# 📁 HomeScreen.tsx

## ¿Qué hace?

Es la pantalla principal de la aplicación.

Su trabajo es:

* cargar el hook principal
* mostrar loading
* renderizar toda la interfaz

---

## Código principal

```tsx
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
```

---

## Explicación

### useNavigation()

Carga toda la lógica:

* GPS
* rutas
* voz
* navegación
* estados

---

### LoadingScreen

Mientras el GPS todavía no cargó:

```tsx
if (!navigation.location)
```

se muestra una pantalla de carga.

---

### NavigationView

Cuando la ubicación existe:

```tsx
<NavigationView />
```

renderiza toda la aplicación.

---

# 📁 useNavigation.ts

## ¿Qué hace?

Es el cerebro completo de la app.

Maneja:

* GPS
* voz
* navegación
* parkings
* rutas
* cámara
* estados

---

## Estados principales

```tsx
const [location, setLocation] =
  useState<Coordinate | null>(null);
```

Guarda la ubicación actual del usuario.

---

```tsx
const [parkings, setParkings] =
  useState<Parking[]>([]);
```

Guarda los estacionamientos.

---

```tsx
const [routeCoords, setRouteCoords] =
  useState<any[]>([]);
```

Guarda las coordenadas de la ruta.

---

```tsx
const [eta, setEta] =
  useState<number | null>(null);
```

Guarda el tiempo estimado.

---

# 📍 GPS EN TIEMPO REAL

## Código

```tsx
Location.watchPositionAsync(
```

---

## ¿Qué hace?

Escucha constantemente el GPS.

Cada vez que el usuario se mueve:

* actualiza posición
* mueve cámara
* actualiza navegación
* rota el auto

---

# 🔊 VOZ GPS

## Código

```tsx
speakInstruction(
  nextInstruction
);
```

---

## ¿Qué hace?

Reproduce instrucciones habladas.

Ejemplo:

```txt
"Gira a la derecha"
```

---

# 🗺 routeService.ts

## Código

```tsx
const url = `
https://routing.openstreetmap.de/
routed-car/route/v1/driving/
`
```

---

## ¿Qué hace?

Consulta la API de rutas.

Devuelve:

* camino
* instrucciones
* ETA
* pasos

---

# 🚗 MapSection.tsx

## ¿Qué hace?

Renderiza el mapa completo.

---

## Código

```tsx
<MapView>
```

---

## Dentro del mapa

### Auto del usuario

```tsx
<CarMarker />
```

---

### Parkings

```tsx
<Marker />
```

---

### Ruta

```tsx
<Polyline />
```

Dibuja el camino azul.

---

# 🚘 CarMarker.tsx

## ¿Qué hace?

Representa el auto.

---

## Código

```tsx
rotation={heading}
```

---

## Explicación

El vehículo gira según la dirección real del teléfono.

---

# 📋 ParkingBottomSheet.tsx

## ¿Qué hace?

Panel inferior de estacionamientos.

---

## Código

```tsx
<ParkingList />
```

---

## Explicación

Muestra:

* parkings cercanos
* distancia
* información

---

# 🧭 NavigationFooter.tsx

## ¿Qué hace?

Panel inferior durante navegación.

---

## Código

```tsx
<Text>
  ⏱ {eta} min
</Text>
```

---

## Explicación

Muestra:

* ETA
* instrucción actual
* pasos restantes
* botón finalizar

---

# 🔊 speech.ts

## Código

```tsx
Speech.speak(text)
```

---

## Explicación

Convierte texto a voz.

---

# 📏 distance.ts

## ¿Qué hace?

Calcula distancia entre dos puntos.

---

## Código

```tsx
const R = 6371;
```

---

## Explicación

Usa la fórmula Haversine.

Calcula kilómetros reales entre coordenadas.

---

# 📍 navigationUtils.ts

## ¿Qué hace?

Detecta si el usuario llegó a un paso.

---

## Código

```tsx
return distance < 0.03;
```

---

## Explicación

Si el usuario está a menos de:

```txt
30 metros
```

se activa el siguiente paso.

---

# 🎨 mapStyle.ts

## ¿Qué hace?

Aplica el modo oscuro.

---

## Resultado

Mapa estilo:

* Uber
* Waze
* Google Maps Night

---

# 🧠 Arquitectura modular

La aplicación se dividió en módulos para:

✅ evitar archivos gigantes
✅ separar lógica y UI
✅ facilitar mantenimiento
✅ escalar funcionalidades
✅ parecer un proyecto profesional

---

# 📚 Explicación de la arquitectura

La aplicación está dividida en carpetas para mantener el código organizado, modular y fácil de escalar.

---

# 📁 src/components

Contiene componentes reutilizables de interfaz.

## NavigationPanel.tsx

Muestra:

* instrucciones actuales
* tiempo estimado
* panel superior tipo GPS

## ParkingList.tsx

Renderiza la lista horizontal de estacionamientos.

## ParkingCard.tsx

Tarjeta individual de cada parking.

## CarMarker.tsx

Representa el auto del usuario en el mapa.

## MapSection.tsx

Contiene:

* MapView
* markers
* polyline de ruta
* vehículo
* destino

Se separó para evitar que HomeScreen sea gigante.

## ParkingBottomSheet.tsx

Panel inferior cuando NO se está navegando.

Muestra:

* lista de parkings
* selector de estacionamiento

## NavigationFooter.tsx

Panel inferior durante la navegación.

Muestra:

* ETA
* instrucciones
* pasos restantes
* botón finalizar navegación

## LoadingScreen.tsx

Pantalla de carga mientras se obtiene GPS.

---

# 📁 src/hooks

Contiene lógica reutilizable.

## useNavigation.ts

Es el cerebro principal de la app.

Controla:

* GPS en tiempo real
* navegación
* voz
* rutas
* instrucciones
* estados
* cámara
* heading

Toda la lógica pesada se mueve aquí.

---

# 📁 src/screens

Pantallas principales.

## HomeScreen.tsx

Pantalla principal.

Solo:

* llama al hook
* renderiza Loading
* renderiza NavigationView

Gracias a esto queda muy corto y limpio.

---

# 📁 src/views

Une componentes grandes.

## NavigationView.tsx

Combina:

* mapa
* panel navegación
* footer
* lista de parkings

Sirve para mantener HomeScreen minimalista.

---

# 📁 src/services

Contiene llamadas externas/APIs.

## parkingService.ts

Obtiene estacionamientos.

Actualmente usa:

* parkings ficticios

Pero puede conectarse a APIs reales.

## routeService.ts

Calcula rutas usando:

* OSRM
* OpenStreetMap

Devuelve:

* coordenadas
* instrucciones
* ETA

---

# 📁 src/utils

Funciones reutilizables.

## distance.ts

Calcula distancia entre dos coordenadas.

## navigationUtils.ts

Detecta si el usuario llegó a un paso de navegación.

## speech.ts

Controla la voz GPS usando:

* expo-speech

---

# 📁 src/styles

Estilos globales.

## mapStyle.ts

Tema oscuro personalizado del mapa.

Estilo similar a:

* Uber
* Waze
* Google Maps Night

---

# 📁 src/types

Tipos TypeScript.

## parking.ts

Define:

* Parking
* Coordinate
* tipos globales

Ayuda a evitar errores.

---

# 🔄 Flujo completo de la aplicación

1. HomeScreen inicia
2. useNavigation obtiene GPS
3. parkingService carga parkings
4. MapSection renderiza mapa
5. Usuario selecciona parking
6. routeService calcula ruta
7. NavigationFooter muestra navegación
8. speech.ts habla instrucciones
9. navigationUtils detecta pasos alcanzados
10. la cámara sigue el vehículo en tiempo real

---

# 🎯 Objetivo de la arquitectura

La app está diseñada para:

✅ ser escalable
✅ fácil de mantener
✅ separar UI y lógica
✅ facilitar futuras mejoras

---

# 👨‍💻 Autor

Desarrollado por Luciano Budman.

Proyecto académico / portfolio.
