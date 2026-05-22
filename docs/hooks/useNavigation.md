# useNavigation

# 📌 ¿Qué hace este hook?

Este hook maneja TODO el sistema de navegación GPS.

Se encarga de:

- calcular rutas
- guardar coordenadas
- manejar instrucciones
- controlar pasos
- calcular ETA

La idea es sacar toda esta lógica gigante de HomeScreen para que el código quede mucho más limpio y modular.

---

# 📁 Ubicación

```txt
src/hooks/useNavigation.ts
```

---

# 🧠 Código completo

```tsx
import {
  useState,
} from 'react';

import {
  getRouteData,
} from '../services/routeService';

import {
  speakInstruction,
} from '../utils/speech';

export default function useNavigation() {

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
    navigationSteps,
    setNavigationSteps,
  ] = useState<any[]>([]);

  const [
    currentStepIndex,
    setCurrentStepIndex,
  ] = useState(0);

  const [
    loadingRoute,
    setLoadingRoute,
  ] = useState(false);

  const getRoute = async (
    location: any,
    destination: any
  ) => {

    setLoadingRoute(true);

    try {

      const data =
        await getRouteData(
          location,
          destination
        );

      if (!data.routes?.length) {
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

      if (steps.length > 0) {

        const instruction =
          steps[0].maneuver
            .instruction ||
          'Navegando';

        setCurrentInstruction(
          instruction
        );

        speakInstruction(
          instruction
        );
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingRoute(false);

    }
  };

  return {

    routeCoords,

    eta,

    currentInstruction,

    navigationSteps,

    currentStepIndex,

    loadingRoute,

    setCurrentStepIndex,

    setCurrentInstruction,

    getRoute,
  };
}
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 useState,
} from 'react';
```

---

# 🧠 useState

Permite guardar datos dinámicos.

---

# 🌐 getRouteData

```tsx
import {
 getRouteData,
} from '../services/routeService';
```

---

## ¿Qué hace?

Hace la petición a la API de rutas.

---

# 🔊 speakInstruction

```tsx
import {
 speakInstruction,
} from '../utils/speech';
```

---

## ¿Qué hace?

Lee instrucciones en voz alta.

---

# 🛣️ routeCoords

```tsx
const [routeCoords, setRouteCoords]
```

---

## ¿Qué guarda?

Las coordenadas de la ruta.

---

# ⏱️ eta

```tsx
const [eta, setEta]
```

---

## ¿Qué guarda?

Tiempo estimado de llegada.

---

# 🧭 currentInstruction

```tsx
const [currentInstruction]
```

---

## ¿Qué guarda?

La instrucción actual.

---

# 👣 navigationSteps

```tsx
const [navigationSteps]
```

---

## ¿Qué guarda?

Todos los pasos de navegación.

---

# 🔢 currentStepIndex

```tsx
const [currentStepIndex]
```

---

## ¿Qué guarda?

Paso actual.

---

# ⏳ loadingRoute

```tsx
const [loadingRoute]
```

---

## ¿Qué guarda?

Si la ruta está cargando.

---

# 🛣️ getRoute()

```tsx
const getRoute = async ()
```

---

## ¿Qué hace?

Calcula la ruta GPS.

---

# 🌐 getRouteData()

```tsx
await getRouteData()
```

---

## ¿Qué hace?

Consulta la API.

---

# 📍 coords

```tsx
const coords =
 route.geometry.coordinates.map()
```

---

## ¿Qué hace?

Convierte coordenadas de la API.

---

# 📦 setRouteCoords

```tsx
setRouteCoords(coords)
```

---

## ¿Qué hace?

Guarda ruta.

---

# ⏱️ ETA

```tsx
route.duration / 60
```

---

## ¿Qué hace?

Convierte segundos a minutos.

---

# 👣 steps

```tsx
route.legs[0].steps
```

---

## ¿Qué hace?

Obtiene pasos de navegación.

---

# 🔊 speakInstruction

```tsx
speakInstruction()
```

---

## ¿Qué hace?

Lee instrucciones.

---

# 📤 return

```tsx
return {
 routeCoords,
 eta,
}
```

---

## ¿Qué hace?

Devuelve datos al componente principal.

---

# 🔄 Flujo completo

```txt
Usuario selecciona parking
↓
getRoute() se ejecuta
↓
API calcula ruta
↓
coords se generan
↓
ETA se calcula
↓
steps se guardan
↓
voz lee instrucción
↓
mapa dibuja ruta
```