# parkingService

# 📌 ¿Qué hace este archivo?

Este service se encarga de manejar TODOS los estacionamientos de la aplicación.

Su responsabilidad es:

- obtener parkings
- generar parkings fake
- devolver datos al mapa

Actualmente usa datos falsos (mock data).

Más adelante podría conectarse a una API real.

---

# 📁 Ubicación

```txt
src/services/parkingService.ts
```

---

# 🧠 Código completo

```tsx
export function fetchFakeParkings(
  latitude: number,
  longitude: number
) {

  return [

    {
      id: 1,

      lat: latitude + 0.002,

      lon: longitude + 0.002,

      tags: {
        name: 'Parking Centro',
        fee: 'yes',
      },
    },

    {
      id: 2,

      lat: latitude - 0.003,

      lon: longitude + 0.001,

      tags: {
        name: 'Parking Norte',
        fee: 'no',
      },
    },

    {
      id: 3,

      lat: latitude + 0.001,

      lon: longitude - 0.002,

      tags: {
        name: 'Parking Sur',
        fee: 'yes',
      },
    },

  ];
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

# 🚗 fetchFakeParkings()

```tsx
fetchFakeParkings()
```

---

## ¿Qué hace?

Genera estacionamientos falsos.

---

# 📍 latitude

```tsx
latitude: number
```

---

## ¿Qué representa?

Latitud del usuario.

---

# 📍 longitude

```tsx
longitude: number
```

---

## ¿Qué representa?

Longitud del usuario.

---

# 📦 return

```tsx
return []
```

---

## ¿Qué hace?

Devuelve lista de estacionamientos.

---

# 🚗 Parking object

```tsx
{
 id:
 lat:
 lon:
 tags:
}
```

---

## ¿Qué representa?

Un estacionamiento individual.

---

# 🆔 id

```tsx
id: 1
```

---

## ¿Qué hace?

Identificador único.

---

# 📍 lat

```tsx
lat: latitude + 0.002
```

---

## ¿Qué hace?

Genera coordenada cercana.

---

# 📍 lon

```tsx
lon: longitude + 0.002
```

---

## ¿Qué hace?

Genera longitud cercana.

---

# 🏷️ tags

```tsx
tags: {}
```

---

## ¿Qué contiene?

Información extra.

---

# 🏷️ name

```tsx
name: 'Parking Centro'
```

---

## ¿Qué hace?

Nombre del parking.

---

# 💰 fee

```tsx
fee: 'yes'
```

---

## ¿Qué hace?

Indica si es pago.

---

# 📌 ¿Por qué usar fake data?

Porque todavía NO hay backend real.

Sirve para:

```txt
✅ probar UI
✅ probar mapas
✅ probar navegación
✅ desarrollar rápido
```

---

# 📌 Más adelante podría usar:

```txt
✅ Firebase
✅ Supabase
✅ MongoDB
✅ PostgreSQL
✅ APIs reales
```

---

# 🔄 Flujo completo

```txt
HomeScreen inicia
↓
fetchFakeParkings()
↓
Se generan parkings
↓
Lista se devuelve
↓
MapView renderiza markers
↓
Usuario selecciona parking
```

---

# 📌 ¿Por qué usar services?

Porque separan:

```txt
❌ lógica visual
de
✅ lógica de datos
```

---

# 📌 Arquitectura correcta

```txt
Screen
↓
Service
↓
API / Datos
```