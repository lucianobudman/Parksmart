# parking

# 📌 ¿Qué hace este archivo?

Este archivo contiene TODOS los tipos de datos principales relacionados con estacionamientos y coordenadas.

En TypeScript, los types sirven para:

- definir estructuras
- validar datos
- evitar errores
- ayudar al autocompletado

Este archivo funciona como un “molde” para los objetos de la aplicación.

---

# 📁 Ubicación

```txt
src/types/parking.ts
```

---

# 🧠 Código completo

```tsx
export interface Coordinate {

  latitude: number;

  longitude: number;
}

export interface Parking {

  id: number;

  lat: number;

  lon: number;

  tags?: {

    name?: string;

    fee?: string;
  };
}
```

---

# 🧠 Explicación COMPLETA

# 📦 export interface

```tsx
export interface
```

---

## ¿Qué hace?

Crea un tipo de dato personalizado.

---

# 📌 ¿Qué es una interface?

Una interface es una plantilla.

Define:

```txt
✅ qué propiedades existen
✅ qué tipo tienen
✅ cómo debe verse un objeto
```

---

# 📌 Ejemplo simple

```tsx
interface Persona {

  nombre: string;

  edad: number;
}
```

---

## Entonces:

```tsx
const persona = {

  nombre: 'Luciano',

  edad: 20,
}
```

sería válido.

---

# 📍 Coordinate

```tsx
export interface Coordinate
```

---

## ¿Qué representa?

Una coordenada GPS.

---

# 📍 latitude

```tsx
latitude: number
```

---

## ¿Qué representa?

Latitud.

---

# 📌 ¿Qué es la latitud?

La posición vertical en el mapa.

Ejemplo:

```txt
Buenos Aires:
-34.6037
```

---

# 📍 longitude

```tsx
longitude: number
```

---

## ¿Qué representa?

Longitud.

---

# 📌 ¿Qué es la longitud?

La posición horizontal en el mapa.

Ejemplo:

```txt
Buenos Aires:
-58.3816
```

---

# 📌 Entonces Coordinate representa:

```tsx
{
 latitude:
 longitude:
}
```

---

# 🚗 Parking

```tsx
export interface Parking
```

---

## ¿Qué representa?

Un estacionamiento.

---

# 🆔 id

```tsx
id: number
```

---

## ¿Qué representa?

Identificador único.

---

# 📍 lat

```tsx
lat: number
```

---

## ¿Qué representa?

Latitud del parking.

---

# 📍 lon

```tsx
lon: number
```

---

## ¿Qué representa?

Longitud del parking.

---

# 🏷️ tags

```tsx
tags?: {}
```

---

## ¿Qué representa?

Información extra del parking.

---

# ❓ ¿Qué significa el ?

```tsx
tags?
```

---

## Significa:

```txt
OPCIONAL
```

El objeto puede existir o no.

---

# 🏷️ name

```tsx
name?: string
```

---

## ¿Qué representa?

Nombre del estacionamiento.

---

# 💰 fee

```tsx
fee?: string
```

---

## ¿Qué representa?

Si el parking es pago.

---

# 📌 ¿Por qué usar interfaces?

Porque ayudan a:

```txt
✅ evitar errores
✅ organizar datos
✅ autocompletado
✅ detectar problemas antes de ejecutar
```

---

# 📌 Ejemplo SIN interface

```tsx
const parking = {
 latitudeee: 123
}
```

Eso podría romper la app.

---

# 📌 Ejemplo CON interface

```tsx
const parking: Parking
```

TypeScript detecta errores automáticamente.

---

# 📌 ¿Dónde se usa Coordinate?

Normalmente en:

```txt
✅ GPS
✅ mapa
✅ rutas
✅ navegación
```

---

# 📌 ¿Dónde se usa Parking?

Normalmente en:

```txt
✅ markers
✅ lista de parkings
✅ navegación
✅ rutas
```

---

# 🔄 Flujo completo

```txt
GPS obtiene coordenadas
↓
Coordinate guarda ubicación
↓
parkingService genera parkings
↓
Parking define estructura
↓
HomeScreen renderiza markers
↓
MapView muestra parkings
```

---

# 📌 ¿Por qué separar types?

Porque evita:

```txt
❌ tipos repetidos
❌ código desordenado
❌ errores difíciles
```

y mejora:

```txt
✅ organización
✅ reutilización
✅ mantenimiento
✅ escalabilidad
```

---

# 📌 Arquitectura correcta

```txt
screens
↓
services
↓
types
↓
datos estructurados
```