# distance

## ¿Qué hace este archivo?

Este archivo pertenece a la carpeta `utils` del proyecto.

## Explicación general

Aquí deberías explicar:

- qué hace el archivo
- qué lógica contiene
- qué componentes usa
- qué hooks usa
- qué funciones exporta
- cómo funciona internamente
- ejemplos de uso
- props
- estados
- funciones
- renderizado
# distance

# 📌 ¿Qué hace este archivo?

Este archivo contiene funciones relacionadas con cálculos de distancia.

Su responsabilidad principal es:

- calcular distancia entre dos puntos GPS
- ayudar a navegación
- calcular proximidad
- mostrar distancias de parkings

Es un archivo MUY importante para el GPS de la app.

---

# 📁 Ubicación

```txt
src/utils/distance.ts
```

---

# 🧠 Código completo

```tsx
export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {

  const R = 6371;

  const dLat =
    (lat2 - lat1) *
    (Math.PI / 180);

  const dLon =
    (lon2 - lon1) *
    (Math.PI / 180);

  const a =

    Math.sin(dLat / 2) *
    Math.sin(dLat / 2) +

    Math.cos(
      lat1 * (Math.PI / 180)
    ) *

    Math.cos(
      lat2 * (Math.PI / 180)
    ) *

    Math.sin(dLon / 2) *

    Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  const distance =
    R * c;

  return distance.toFixed(2);
}
```

---

# 🧠 Explicación COMPLETA

# 📦 export function

```tsx
export function
```

---

## ¿Qué hace?

Exporta una función.

Permite usarla desde otros archivos.

---

# 📏 getDistance()

```tsx
getDistance()
```

---

## ¿Qué hace?

Calcula distancia entre dos coordenadas GPS.

---

# 📍 lat1

```tsx
lat1
```

---

## ¿Qué representa?

Latitud del punto inicial.

---

# 📍 lon1

```tsx
lon1
```

---

## ¿Qué representa?

Longitud del punto inicial.

---

# 📍 lat2

```tsx
lat2
```

---

## ¿Qué representa?

Latitud del segundo punto.

---

# 📍 lon2

```tsx
lon2
```

---

## ¿Qué representa?

Longitud del segundo punto.

---

# 🌍 R = 6371

```tsx
const R = 6371
```

---

## ¿Qué significa?

Radio de la Tierra en kilómetros.

---

# 📐 Math.PI

```tsx
Math.PI
```

---

## ¿Qué hace?

Representa π (pi).

---

# 📐 Conversión a radianes

```tsx
(Math.PI / 180)
```

---

## ¿Qué hace?

Convierte grados a radianes.

---

# 📐 dLat

```tsx
const dLat
```

---

## ¿Qué guarda?

Diferencia de latitud.

---

# 📐 dLon

```tsx
const dLon
```

---

## ¿Qué guarda?

Diferencia de longitud.

---

# 📐 Fórmula Haversine

```tsx
const a =
```

---

## ¿Qué hace?

Calcula distancia curva sobre la Tierra.

---

# 📌 ¿Qué es Haversine?

Es una fórmula matemática usada por:

```txt
✅ GPS
✅ Google Maps
✅ Waze
✅ Uber
✅ navegación satelital
```

para calcular distancias reales.

---

# 📐 Math.sin()

```tsx
Math.sin()
```

---

## ¿Qué hace?

Calcula seno matemático.

---

# 📐 Math.cos()

```tsx
Math.cos()
```

---

## ¿Qué hace?

Calcula coseno matemático.

---

# 📐 Math.atan2()

```tsx
Math.atan2()
```

---

## ¿Qué hace?

Calcula ángulo matemático.

---

# 📐 Math.sqrt()

```tsx
Math.sqrt()
```

---

## ¿Qué hace?

Calcula raíz cuadrada.

---

# 📏 distance

```tsx
const distance
```

---

## ¿Qué guarda?

Distancia final en kilómetros.

---

# 📤 return

```tsx
return distance.toFixed(2)
```

---

## ¿Qué hace?

Devuelve distancia con 2 decimales.

---

# 📌 Ejemplo real

```tsx
getDistance(
 -34.6037,
 -58.3816,
 -34.6050,
 -58.3900
)
```

---

## Resultado:

```txt
0.75 km
```

---

# 📌 ¿Dónde se usa?

Normalmente en:

```txt
✅ ParkingList
✅ navegación
✅ proximidad GPS
✅ rutas
✅ ETA
```

---

# 🔄 Flujo completo

```txt
GPS obtiene ubicación
↓
Parking tiene coordenadas
↓
getDistance() calcula distancia
↓
UI muestra kilómetros
↓
Usuario elige parking cercano
```

---

# 📌 ¿Por qué separar utils?

Porque contienen:

```txt
funciones reutilizables
```

---

# 📌 ¿Qué NO debería estar en utils?

```txt
❌ UI
❌ pantallas
❌ componentes
❌ navegación
```

---

# 📌 ¿Qué sí debería estar?

```txt
✅ matemáticas
✅ helpers
✅ cálculos
✅ formato
✅ validaciones
```

---

# 📌 Arquitectura correcta

```txt
screens
↓
utils
↓
funciones auxiliares
```
---

## Código

```tsx
// Pegá acá el código completo del archivo
```

---

## Explicación línea por línea

### Imports

Explicar qué importa y para qué sirve.

---

### Variables

Explicar qué guarda cada variable.

---

### useState

Explicar cada estado.

---

### useEffect

Explicar cuándo se ejecuta y por qué.

---

### Funciones

Explicar cada función.

---

### Renderizado

Explicar qué se muestra en pantalla.

---

### Styles

Explicar estilos principales.
