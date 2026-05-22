# ParkingCard

# 📌 ¿Qué hace este componente?

Este componente representa UNA tarjeta individual de estacionamiento.

Cada parking que aparece en pantalla usa este componente.

Muestra:

- nombre
- distancia
- si es pago o gratis
- estado seleccionado

---

# 📁 Ubicación

```txt
src/components/ParkingCard.tsx
```

---

# 🧠 Código completo

```tsx
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  parking: any;

  selected: boolean;

  distance: string;

  onPress: () => void;
};

export default function ParkingCard({
  parking,
  selected,
  distance,
  onPress,
}: Props) {

  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
      onPress={onPress}
    >

      <Text style={styles.name}>
        {parking.tags?.name ||
          'Estacionamiento'}
      </Text>

      <Text style={styles.info}>
        {parking.tags?.fee === 'yes'
          ? '💰 De pago'
          : '✅ Gratis / Sin info'}
      </Text>

      <Text style={styles.distance}>
        {distance} km
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    width: 240,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 20,
  },

  selectedCard: {
    backgroundColor: '#2563eb',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  info: {
    marginTop: 10,
    color: '#374151',
  },

  distance: {
    marginTop: 15,
    fontWeight: '700',
    fontSize: 18,
  },

});
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 TouchableOpacity,
 Text,
 StyleSheet,
} from 'react-native';
```

---

# 👆 TouchableOpacity

Es un botón presionable.

Permite tocar la tarjeta.

---

# 📝 Text

Muestra texto.

---

# 🎨 StyleSheet

Crea estilos.

---

# 🧩 Props

```tsx
type Props = {
 parking: any;
 selected: boolean;
 distance: string;
 onPress: () => void;
};
```

---

# 🚗 parking

Contiene información del estacionamiento.

---

# 🎯 selected

Indica si el parking está seleccionado.

---

# 📏 distance

Distancia entre usuario y parking.

---

# 👆 onPress

Función que se ejecuta al tocar la tarjeta.

---

# 🖥️ TouchableOpacity

```tsx
<TouchableOpacity
 onPress={onPress}
>
```

---

## ¿Qué hace?

Permite seleccionar el parking.

---

# 🎨 style={[ ]}

```tsx
style={[
 styles.card,
 selected && styles.selectedCard,
]}
```

---

## ¿Qué hace?

Aplica estilos dinámicos.

---

# ❓ selected &&

```tsx
selected && styles.selectedCard
```

---

## ¿Qué significa?

“Si selected es true”.

---

# 🚗 Nombre

```tsx
{parking.tags?.name}
```

---

## ¿Qué hace?

Muestra el nombre del parking.

---

# ❓ ?. (optional chaining)

```tsx
parking.tags?.name
```

---

## ¿Qué significa?

“Si tags existe”.

Evita errores.

---

# 💰 fee

```tsx
parking.tags?.fee === 'yes'
```

---

## ¿Qué hace?

Detecta si el parking es pago.

---

# 📏 distance

```tsx
<Text>
 {distance} km
</Text>
```

---

## ¿Qué hace?

Muestra distancia.

---

# 🎨 card

```tsx
card: {
 width: 240,
}
```

---

## width

Ancho de la tarjeta.

---

## backgroundColor

Color de fondo.

---

## padding

Espacio interno.

---

## borderRadius

Bordes redondeados.

---

# 🎨 selectedCard

```tsx
selectedCard: {
 backgroundColor: '#2563eb',
}
```

---

## ¿Qué hace?

Cambia color si el parking está seleccionado.

---

# 🔄 Flujo completo

```txt
Usuario abre lista
↓
ParkingCard aparece
↓
Usuario toca tarjeta
↓
onPress se ejecuta
↓
Parking se selecciona
↓
Card cambia color
```