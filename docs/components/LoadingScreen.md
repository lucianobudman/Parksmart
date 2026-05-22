# LoadingScreen

# 📌 ¿Qué hace este componente?

Muestra una pantalla de carga mientras:

- inicia el GPS
- se obtienen permisos
- se carga la ubicación

---

# 📁 Ubicación

```txt
src/components/LoadingScreen.tsx
```

---

# 🧠 Código completo

```tsx
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function LoadingScreen() {

  return (
    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color="#2563eb"
      />

      <Text style={styles.text}>
        Obteniendo ubicación...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 20,
    fontSize: 18,
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
 ActivityIndicator,
 StyleSheet,
} from 'react-native';
```

---

# 🟦 View

Es un contenedor.

Funciona parecido a un div en HTML.

---

# 📝 Text

Muestra texto.

---

# ⏳ ActivityIndicator

Es el spinner de carga.

---

# 🎨 StyleSheet

Permite crear estilos.

---

# 🧩 Componente principal

```tsx
export default function LoadingScreen()
```

---

## ¿Qué hace?

Crea el componente de loading.

---

# 🖥️ Return

```tsx
return (
 <View>
  <ActivityIndicator />
  <Text />
 </View>
)
```

---

# ⏳ ActivityIndicator

```tsx
<ActivityIndicator
 size="large"
 color="#2563eb"
/>
```

---

## size

Tamaño del spinner.

---

## color

Color del spinner.

---

# 📝 Text

```tsx
<Text>
 Obteniendo ubicación...
</Text>
```

---

## ¿Qué hace?

Muestra mensaje al usuario.

---

# 🎨 Styles

# container

```tsx
container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
}
```

---

## flex: 1

Hace que ocupe toda la pantalla.

---

## justifyContent

Centra verticalmente.

---

## alignItems

Centra horizontalmente.

---

# text

```tsx
text: {
 marginTop: 20,
 fontSize: 18,
}
```

---

## marginTop

Separa el texto del spinner.

---

## fontSize

Tamaño del texto.