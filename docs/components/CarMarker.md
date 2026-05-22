# CarMarker

# 📌 ¿Qué hace este componente?

Este componente muestra el vehículo del usuario dentro del mapa.

Cuando el GPS cambia la posición del usuario, el auto también cambia su posición en tiempo real.

Además:

- rota según la dirección del celular
- se mueve en tiempo real
- representa al usuario

---

# 📁 Ubicación

```txt
src/components/CarMarker.tsx
```

---

# 🧠 Código completo

```tsx
import { Marker } from 'react-native-maps';

type Props = {
  location: {
    latitude: number;
    longitude: number;
  };

  heading: number;
};

export default function CarMarker({
  location,
  heading,
}: Props) {

  return (
    <Marker
      coordinate={location}
      rotation={heading}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
    />
  );
}
```

---

# 🧠 Explicación COMPLETA

---

# 📦 Imports

```tsx
import { Marker } from 'react-native-maps';
```

---

## ¿Qué es Marker?

`Marker` es un componente de react-native-maps.

Sirve para colocar elementos sobre el mapa.

Ejemplos:

- autos
- personas
- parkings
- destinos

---

# 🧩 Props

```tsx
type Props = {
  location: {
    latitude: number;
    longitude: number;
  };

  heading: number;
};
```

---

## ¿Qué significa esto?

Estamos diciendo:

> “Este componente necesita recibir estos datos”.

---

# 📍 location

```tsx
location: {
 latitude: number;
 longitude: number;
}
```

---

## ¿Qué guarda?

La posición del vehículo.

---

## latitude

Es la latitud.

Indica arriba o abajo en el mapa.

---

## longitude

Es la longitud.

Indica izquierda o derecha.

---

# 🧭 heading

```tsx
heading: number;
```

---

## ¿Qué es?

La dirección hacia donde apunta el dispositivo.

---

## Ejemplos

```txt
0 = norte
90 = derecha
180 = sur
270 = izquierda
```

---

# 🚗 Componente principal

```tsx
export default function CarMarker({
  location,
  heading,
}: Props)
```

---

## ¿Qué hace?

Crea el componente.

---

## export default

Permite usar el componente en otros archivos.

---

## location y heading

Se reciben desde HomeScreen.

---

# 🗺️ Return

```tsx
return (
  <Marker
    coordinate={location}
    rotation={heading}
  />
);
```

---

# 📍 coordinate

```tsx
coordinate={location}
```

---

## ¿Qué hace?

Le dice al mapa dónde dibujar el auto.

---

# 🔄 rotation

```tsx
rotation={heading}
```

---

## ¿Qué hace?

Hace que el auto rote según la dirección del usuario.

---

# ⚓ anchor

```tsx
anchor={{
 x: 0.5,
 y: 0.5,
}}
```

---

## ¿Qué hace?

Centra correctamente el vehículo.

---

# 🔄 Flujo completo

```txt
GPS cambia ubicación
↓
location se actualiza
↓
CarMarker recibe nueva posición
↓
Marker cambia de lugar
↓
El auto se mueve en el mapa
```