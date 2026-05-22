# HomeScreen

# 📌 ¿Qué hace esta pantalla?

Esta es la pantalla PRINCIPAL de la aplicación.

Acá ocurre casi toda la lógica importante.

La pantalla:

- muestra el mapa
- obtiene GPS
- renderiza parkings
- calcula rutas
- muestra navegación
- controla voz
- mueve la cámara
- renderiza el auto
- muestra ETA

Es el “corazón” de la app.

---

# 📁 Ubicación

```txt
src/screens/HomeScreen.tsx
```

---

# 🧠 Responsabilidades principales

```txt
✅ Mostrar mapa
✅ Obtener GPS
✅ Renderizar auto
✅ Mostrar estacionamientos
✅ Calcular rutas
✅ Navegación turn-by-turn
✅ Voz integrada
✅ ETA
✅ Cámara dinámica
✅ Modo navegación
```

---

# 📦 Imports principales

```tsx
import MapView
import Marker
import Polyline
```

---

## ¿Qué hacen?

Renderizan el mapa y las rutas.

---

# 📦 expo-location

```tsx
import * as Location
```

---

## ¿Qué hace?

Controla el GPS.

---

# 📦 expo-speech

```tsx
import * as Speech
```

---

## ¿Qué hace?

Permite hablar instrucciones.

---

# 📦 Components

```tsx
import NavigationPanel
import ParkingList
import CarMarker
```

---

## ¿Qué hacen?

Separan la UI en piezas reutilizables.

---

# 📦 Services

```tsx
import getRouteData
import fetchFakeParkings
```

---

## ¿Qué hacen?

Obtienen datos externos.

---

# 📦 Utils

```tsx
import getDistance
```

---

## ¿Qué hace?

Calcula distancias.

---

# 🧠 Estados principales

# 📍 location

```tsx
const [location, setLocation]
```

---

## ¿Qué guarda?

Ubicación actual del usuario.

---

# 🚗 parkings

```tsx
const [parkings, setParkings]
```

---

## ¿Qué guarda?

Lista de estacionamientos.

---

# 🎯 selectedParking

```tsx
const [selectedParking]
```

---

## ¿Qué guarda?

Parking seleccionado.

---

# 🛣️ routeCoords

```tsx
const [routeCoords]
```

---

## ¿Qué guarda?

Coordenadas de la ruta.

---

# ⏱️ eta

```tsx
const [eta]
```

---

## ¿Qué guarda?

Tiempo estimado.

---

# 🧭 currentInstruction

```tsx
const [currentInstruction]
```

---

## ¿Qué guarda?

Instrucción actual de navegación.

---

# 👣 navigationSteps

```tsx
const [navigationSteps]
```

---

## ¿Qué guarda?

Todos los pasos GPS.

---

# 🔢 currentStepIndex

```tsx
const [currentStepIndex]
```

---

## ¿Qué guarda?

Paso actual.

---

# 🧭 heading

```tsx
const [heading]
```

---

## ¿Qué guarda?

Rotación del vehículo.

---

# 🗺️ MapView

```tsx
<MapView />
```

---

## ¿Qué hace?

Renderiza el mapa principal.

---

# 📍 Marker

```tsx
<Marker />
```

---

## ¿Qué hace?

Muestra puntos en el mapa.

---

# 🛣️ Polyline

```tsx
<Polyline />
```

---

## ¿Qué hace?

Dibuja la ruta GPS.

---

# 🚗 CarMarker

```tsx
<CarMarker />
```

---

## ¿Qué hace?

Muestra el auto del usuario.

---

# 📃 ParkingList

```tsx
<ParkingList />
```

---

## ¿Qué hace?

Muestra lista de estacionamientos.

---

# 🧭 NavigationPanel

```tsx
<NavigationPanel />
```

---

## ¿Qué hace?

Muestra instrucciones GPS.

---

# 🔊 Speech.speak()

```tsx
Speech.speak()
```

---

## ¿Qué hace?

Lee instrucciones en voz alta.

---

# 🌐 getRouteData()

```tsx
getRouteData()
```

---

## ¿Qué hace?

Consulta API de rutas.

---

# 📍 watchPositionAsync()

```tsx
Location.watchPositionAsync()
```

---

## ¿Qué hace?

Actualiza GPS en tiempo real.

---

# 📷 animateCamera()

```tsx
mapRef.current?.animateCamera()
```

---

## ¿Qué hace?

Mueve la cámara automáticamente.

---

# 🔄 Flujo completo

```txt
App inicia
↓
GPS obtiene ubicación
↓
Mapa aparece
↓
Parkings se generan
↓
Usuario selecciona parking
↓
API calcula ruta
↓
Ruta se dibuja
↓
Voz habla instrucciones
↓
GPS detecta movimiento
↓
Cámara sigue usuario
↓
Pasos de navegación cambian
```

---

# 📌 ¿Por qué HomeScreen es tan grande?

Porque centraliza:

```txt
GPS
+
Mapa
+
Navegación
+
Rutas
+
UI
```

---

# 📌 ¿Cómo mejorar esto?

Separando lógica en:

```txt
✅ hooks
✅ services
✅ utils
✅ components
```

que es exactamente lo que estás haciendo ahora.