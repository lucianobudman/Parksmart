# navigationUtils

# 📌 ¿Qué hace este archivo?

Este archivo contiene funciones auxiliares relacionadas con navegación GPS.

Su objetivo es:

- detectar proximidad
- ayudar al sistema turn-by-turn
- verificar llegada a pasos
- reutilizar lógica GPS

---

# 📁 Ubicación

```txt
src/utils/navigationUtils.ts
```

---

# 🧠 Código completo

```tsx
import { getDistance }
from './distance';

export function isNearCoordinate(
  currentLat: number,
  currentLon: number,
  targetLat: number,
  targetLon: number
) {

  const distance =
    Number(
      getDistance(
        currentLat,
        currentLon,
        targetLat,
        targetLon
      )
    );

  return distance < 0.03;
}
```

---

# 🧠 Explicación COMPLETA

# 📦 import

```tsx
import { getDistance }
```

---

## ¿Qué hace?

Importa función de distancia.

---

# 📏 getDistance()

```tsx
getDistance()
```

---

## ¿Qué hace?

Calcula kilómetros entre puntos.

---

# 📍 isNearCoordinate()

```tsx
isNearCoordinate()
```

---

## ¿Qué hace?

Verifica si el usuario está cerca de un punto GPS.

---

# 📍 currentLat

```tsx
currentLat
```

---

## ¿Qué representa?

Latitud actual del usuario.

---

# 📍 currentLon

```tsx
currentLon
```

---

## ¿Qué representa?

Longitud actual del usuario.

---

# 🎯 targetLat

```tsx
targetLat
```

---

## ¿Qué representa?

Latitud objetivo.

---

# 🎯 targetLon

```tsx
targetLon
```

---

## ¿Qué representa?

Longitud objetivo.

---

# 📏 distance

```tsx
const distance
```

---

## ¿Qué guarda?

Distancia calculada.

---

# 🔢 Number()

```tsx
Number()
```

---

## ¿Qué hace?

Convierte string en número.

---

# ❓ return distance < 0.03

```tsx
return distance < 0.03
```

---

## ¿Qué hace?

Verifica si está a menos de 30 metros.

---

# 📌 ¿Por qué 0.03?

Porque:

```txt
0.03 km = 30 metros
```

---

# 📌 ¿Para qué sirve esto?

Sirve para detectar:

```txt
✅ llegada a giro
✅ llegada a paso GPS
✅ cambio de instrucción
✅ navegación automática
```

---

# 📌 ¿Dónde se usa?

Normalmente en:

```txt
✅ HomeScreen
✅ navegación turn-by-turn
✅ GPS realtime
```

---

# 🔄 Flujo completo

```txt
GPS actualiza ubicación
↓
isNearCoordinate()
↓
Distancia se calcula
↓
Si usuario está cerca:
↓
Siguiente paso se activa
↓
Nueva instrucción aparece
↓
Voz habla siguiente giro
```

---

# 📌 ¿Por qué separar esto?

Porque evita:

```txt
❌ lógica GPS gigante en HomeScreen
```

---

# 📌 Beneficios

```txt
✅ código limpio
✅ reutilizable
✅ modular
✅ fácil de mantener
```