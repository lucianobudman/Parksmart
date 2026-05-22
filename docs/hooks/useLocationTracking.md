# useLocation

# 📌 ¿Qué hace este hook?

Este hook se encarga de manejar TODO el sistema GPS de la aplicación.

Obtiene:

- permisos
- ubicación actual
- actualización en tiempo real

En vez de poner toda esa lógica dentro de HomeScreen, la movemos a un hook separado para que el código quede más limpio.

---

# 📁 Ubicación

```txt
src/hooks/useLocation.ts
```

---

# 🧠 Código completo

```tsx
import {
  useEffect,
  useState,
} from 'react';

import * as Location from 'expo-location';

export default function useLocation() {

  const [location, setLocation] =
    useState<any>(null);

  const [heading, setHeading] =
    useState(0);

  useEffect(() => {

    let subscriber: any;

    (async () => {

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.High,
        });

      setLocation({
        latitude:
          currentLocation.coords.latitude,

        longitude:
          currentLocation.coords.longitude,
      });

      subscriber =
        await Location.watchPositionAsync(
          {
            accuracy:
              Location.Accuracy.High,

            timeInterval: 2000,

            distanceInterval: 5,
          },

          (loc) => {

            setLocation({
              latitude:
                loc.coords.latitude,

              longitude:
                loc.coords.longitude,
            });

            setHeading(
              loc.coords.heading || 0
            );
          }
        );

    })();

    return () => {
      subscriber?.remove();
    };

  }, []);

  return {
    location,
    heading,
  };
}
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 useEffect,
 useState,
} from 'react';
```

---

# 🧠 useState

Permite guardar datos dinámicos.

---

# 🔄 useEffect

Ejecuta código automáticamente.

---

# 📦 expo-location

```tsx
import * as Location from 'expo-location';
```

---

## ¿Qué hace?

Maneja todo el GPS del dispositivo.

---

# 🧩 location

```tsx
const [location, setLocation]
```

---

## ¿Qué guarda?

La ubicación actual del usuario.

---

# 🧭 heading

```tsx
const [heading, setHeading]
```

---

## ¿Qué guarda?

La dirección hacia donde apunta el dispositivo.

---

# 🔄 useEffect

```tsx
useEffect(() => {
}, []);
```

---

## ¿Qué hace?

Se ejecuta una sola vez cuando inicia el hook.

---

# 🔐 requestForegroundPermissionsAsync

```tsx
await Location.requestForegroundPermissionsAsync();
```

---

## ¿Qué hace?

Pide permisos GPS.

---

# ❌ status !== 'granted'

```tsx
if (status !== 'granted')
```

---

## ¿Qué hace?

Verifica si el usuario aceptó permisos.

---

# 📍 getCurrentPositionAsync

```tsx
await Location.getCurrentPositionAsync()
```

---

## ¿Qué hace?

Obtiene ubicación actual.

---

# 🛰️ watchPositionAsync

```tsx
Location.watchPositionAsync()
```

---

## ¿Qué hace?

Escucha cambios del GPS en tiempo real.

---

# ⏱️ timeInterval

```tsx
timeInterval: 2000
```

---

## ¿Qué hace?

Actualiza cada 2 segundos.

---

# 📏 distanceInterval

```tsx
distanceInterval: 5
```

---

## ¿Qué hace?

Actualiza cada 5 metros.

---

# 📍 setLocation

```tsx
setLocation({
 latitude:
 longitude:
})
```

---

## ¿Qué hace?

Actualiza ubicación del usuario.

---

# 🧭 setHeading

```tsx
setHeading()
```

---

## ¿Qué hace?

Actualiza rotación del vehículo.

---

# 🧹 Cleanup

```tsx
return () => {
 subscriber?.remove();
}
```

---

## ¿Qué hace?

Detiene GPS cuando el componente se destruye.

---

# 📤 return

```tsx
return {
 location,
 heading,
}
```

---

## ¿Qué hace?

Devuelve datos para usarlos en HomeScreen.

---

# 🔄 Flujo completo

```txt
App inicia
↓
Hook pide permisos
↓
GPS obtiene ubicación
↓
watchPosition escucha cambios
↓
location se actualiza
↓
heading se actualiza
↓
Mapa cambia en tiempo real
```