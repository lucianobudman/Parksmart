# ParkingList

# 📌 ¿Qué hace este componente?

Este componente renderiza TODOS los estacionamientos.

Se encarga de:

- recorrer la lista
- crear tarjetas
- optimizar rendimiento

---

# 📁 Ubicación

```txt
src/components/ParkingList.tsx
```

---

# 🧠 Código completo

```tsx
import {
  FlatList,
} from 'react-native';

import ParkingCard from './ParkingCard';

type Props = {
  parkings: any[];

  selectedParking: any;

  location: any;

  getDistance: any;

  onSelect: any;
};

export default function ParkingList({
  parkings,
  selectedParking,
  location,
  getDistance,
  onSelect,
}: Props) {

  return (
    <FlatList
      horizontal
      data={parkings}
      keyExtractor={(item) =>
        item.id.toString()
      }
      renderItem={({ item }) => (

        <ParkingCard
          parking={item}
          selected={
            selectedParking?.id ===
            item.id
          }
          distance={getDistance(
            location.latitude,
            location.longitude,
            item.lat,
            item.lon
          )}
          onPress={() =>
            onSelect(item)
          }
        />

      )}
      showsHorizontalScrollIndicator={
        false
      }
    />
  );
}
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 FlatList,
} from 'react-native';
```

---

# 📃 FlatList

Es una lista optimizada.

Sirve para renderizar muchos elementos.

---

# 🚗 ParkingCard

```tsx
import ParkingCard from './ParkingCard';
```

---

## ¿Qué hace?

Importa las tarjetas individuales.

---

# 🧩 Props

```tsx
type Props = {
 parkings: any[];
 selectedParking: any;
 location: any;
 getDistance: any;
 onSelect: any;
};
```

---

# 🚗 parkings

Lista de estacionamientos.

---

# 🎯 selectedParking

Parking actualmente seleccionado.

---

# 📍 location

Ubicación actual del usuario.

---

# 📏 getDistance

Función que calcula distancia.

---

# 👆 onSelect

Función para seleccionar parking.

---

# 🖥️ FlatList

```tsx
<FlatList />
```

---

## ¿Qué hace?

Renderiza lista optimizada.

---

# ↔️ horizontal

```tsx
horizontal
```

---

## ¿Qué hace?

Hace scroll horizontal.

---

# 📦 data

```tsx
data={parkings}
```

---

## ¿Qué hace?

Le pasa la lista.

---

# 🔑 keyExtractor

```tsx
keyExtractor={(item) =>
 item.id.toString()
}
```

---

## ¿Qué hace?

Genera IDs únicos.

React necesita esto para rendimiento.

---

# 🧠 renderItem

```tsx
renderItem={({ item }) => (
```

---

## ¿Qué hace?

Renderiza cada parking.

---

# 🚗 ParkingCard

```tsx
<ParkingCard />
```

---

## ¿Qué hace?

Crea una tarjeta por parking.

---

# 🎯 selected

```tsx
selected={
 selectedParking?.id === item.id
}
```

---

## ¿Qué hace?

Detecta si está seleccionado.

---

# 📏 getDistance

```tsx
distance={getDistance()}
```

---

## ¿Qué hace?

Calcula distancia entre:

- usuario
- parking

---

# 👆 onPress

```tsx
onPress={() =>
 onSelect(item)
}
```

---

## ¿Qué hace?

Selecciona parking al tocarlo.

---

# 🚫 showsHorizontalScrollIndicator

```tsx
showsHorizontalScrollIndicator={
 false
}
```

---

## ¿Qué hace?

Oculta barra de scroll.

---

# 🔄 Flujo completo

```txt
ParkingList recibe parkings
↓
FlatList recorre lista
↓
renderItem crea ParkingCard
↓
Usuario toca parking
↓
onSelect se ejecuta
↓
Parking seleccionado cambia
```