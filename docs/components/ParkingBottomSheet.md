# ParkingBottomSheet

# 📌 ¿Qué hace este componente?

Este componente representa el panel inferior de estacionamientos.

Es la sección que aparece abajo mostrando:

- lista de parkings
- loading
- información
- selección de parking

Funciona parecido a las apps modernas tipo Uber o Google Maps.

---

# 📁 Ubicación

```txt
src/components/ParkingBottomSheet.tsx
```

---

# 🧠 Código completo

```tsx
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ParkingList from './ParkingList';

type Props = {
  parkings: any[];

  selectedParking: any;

  location: any;

  getDistance: any;

  onSelect: any;

  loadingRoute: boolean;
};

export default function ParkingBottomSheet({
  parkings,
  selectedParking,
  location,
  getDistance,
  onSelect,
  loadingRoute,
}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🚗 Estacionamientos
      </Text>

      <ParkingList
        parkings={parkings}
        selectedParking={selectedParking}
        location={location}
        getDistance={getDistance}
        onSelect={onSelect}
      />

      {loadingRoute && (

        <Text style={styles.loading}>
          Calculando ruta...
        </Text>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    minHeight: 220,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 15,
  },

  loading: {
    textAlign: 'center',
    marginTop: 10,
  },

});
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 View,
 Text,
 StyleSheet,
} from 'react-native';
```

---

# 🟦 View

Contenedor principal.

---

# 📝 Text

Muestra texto.

---

# 🎨 StyleSheet

Crea estilos.

---

# 🚗 ParkingList

```tsx
import ParkingList from './ParkingList';
```

---

## ¿Qué hace?

Importa la lista de parkings.

---

# 🧩 Props

```tsx
type Props = {
 parkings: any[];
 selectedParking: any;
 location: any;
 getDistance: any;
 onSelect: any;
 loadingRoute: boolean;
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

Función que selecciona parking.

---

# ⏳ loadingRoute

Indica si la ruta está cargando.

---

# 🖥️ Return

```tsx
return (
 <View>
 </View>
)
```

---

# 🚗 Título

```tsx
<Text>
 🚗 Estacionamientos
</Text>
```

---

## ¿Qué hace?

Muestra el título del panel.

---

# 🚗 ParkingList

```tsx
<ParkingList />
```

---

## ¿Qué hace?

Renderiza todos los estacionamientos.

---

# ❓ loadingRoute &&

```tsx
{loadingRoute && (
```

---

## ¿Qué significa?

“Mostrar esto SOLO si loadingRoute es true”.

---

# ⏳ Loading

```tsx
<Text>
 Calculando ruta...
</Text>
```

---

## ¿Qué hace?

Muestra mensaje mientras calcula la ruta.

---

# 🎨 container

```tsx
container: {
 position: 'absolute',
 bottom: 0,
}
```

---

## ¿Qué hace?

Fija el panel abajo de la pantalla.

---

## borderTopLeftRadius

Redondea esquina superior izquierda.

---

## borderTopRightRadius

Redondea esquina superior derecha.

---

## minHeight

Altura mínima del panel.

---

# 🎨 title

Controla apariencia del título.

---

# 🎨 loading

Controla apariencia del loading.

---

# 🔄 Flujo completo

```txt
Usuario abre app
↓
ParkingBottomSheet aparece
↓
Se cargan parkings
↓
Usuario selecciona uno
↓
Ruta comienza a calcularse
↓
Loading aparece
↓
Ruta finaliza
```