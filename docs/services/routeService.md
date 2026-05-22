# routeService

# 📌 ¿Qué hace este archivo?

Este service se encarga de calcular rutas GPS.

Hace peticiones a una API externa para obtener:

- rutas
- coordenadas
- instrucciones
- ETA
- pasos de navegación

Es uno de los archivos más importantes de la app.

---

# 📁 Ubicación

```txt
src/services/routeService.ts
```

---

# 🧠 Código completo

```tsx
const BASE_URL =
  'https://router.project-osrm.org';

export async function getRouteData(
  origin: any,
  destination: any
) {

  const url =

`${BASE_URL}/route/v1/driving/
${origin.longitude},
${origin.latitude};
${destination.lon},
${destination.lat}
?overview=full
&geometries=geojson
&steps=true`;

  const response =
    await fetch(url);

  const data =
    await response.json();

  return data;
}
```

---

# 🧠 Explicación COMPLETA

# 🌐 BASE_URL

```tsx
const BASE_URL
```

---

## ¿Qué guarda?

La URL principal de la API.

---

# 🌐 OSRM

```txt
router.project-osrm.org
```

---

## ¿Qué es?

Una API gratuita de navegación GPS.

---

# 📦 export async function

```tsx
export async function
```

---

## ¿Qué hace?

Exporta función asíncrona.

---

# ⚡ async

```tsx
async
```

---

## ¿Qué significa?

La función tarda tiempo.

Porque consulta internet.

---

# 🛣️ getRouteData()

```tsx
getRouteData()
```

---

## ¿Qué hace?

Obtiene datos de navegación.

---

# 📍 origin

```tsx
origin
```

---

## ¿Qué representa?

Ubicación del usuario.

---

# 🎯 destination

```tsx
destination
```

---

## ¿Qué representa?

Parking destino.

---

# 🌐 url

```tsx
const url =
```

---

## ¿Qué hace?

Construye URL de la API.

---

# 📍 Coordenadas

```tsx
longitude,
latitude
```

---

## ¿Qué hacen?

Indican origen y destino.

---

# 🛣️ overview=full

```txt
overview=full
```

---

## ¿Qué hace?

Devuelve ruta completa.

---

# 📍 geometries=geojson

```txt
geometries=geojson
```

---

## ¿Qué hace?

Devuelve coordenadas compatibles con mapas.

---

# 👣 steps=true

```txt
steps=true
```

---

## ¿Qué hace?

Devuelve instrucciones paso a paso.

---

# 🌐 fetch()

```tsx
await fetch(url)
```

---

## ¿Qué hace?

Hace petición HTTP.

---

# 📦 response

```tsx
const response
```

---

## ¿Qué contiene?

Respuesta del servidor.

---

# 📦 response.json()

```tsx
await response.json()
```

---

## ¿Qué hace?

Convierte respuesta en JSON.

---

# 📤 return data

```tsx
return data
```

---

## ¿Qué hace?

Devuelve información de navegación.

---

# 🔄 Flujo completo

```txt
Usuario selecciona parking
↓
getRouteData()
↓
URL se construye
↓
fetch() consulta API
↓
OSRM calcula ruta
↓
API devuelve JSON
↓
HomeScreen recibe datos
↓
Mapa dibuja ruta
↓
Voz lee instrucciones
```

---

# 📌 ¿Por qué usar services?

Porque separan:

```txt
❌ lógica visual
de
✅ lógica de red/API
```

---

# 📌 Más adelante podrías usar:

```txt
✅ Google Maps API
✅ Mapbox
✅ HERE Maps
✅ TomTom
```

---

# 📌 ¿Qué devuelve la API?

```txt
✅ Ruta
✅ Distancia
✅ Duración
✅ Coordenadas
✅ Instrucciones
✅ Steps
```