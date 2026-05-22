# NavigationPanel

# 📌 ¿Qué hace este componente?

Este componente muestra el panel superior de navegación.

Es el cuadro que aparece arriba del mapa mostrando:

- instrucción actual
- tiempo estimado
- estado de navegación

Funciona parecido a Google Maps o Waze.

---

# 📁 Ubicación

```txt
src/components/NavigationPanel.tsx
```

---

# 🧠 Código completo

```tsx
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  instruction: string;

  eta: number | null;
};

export default function NavigationPanel({
  instruction,
  eta,
}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🧭 Navegación
      </Text>

      <Text style={styles.instruction}>
        {instruction}
      </Text>

      {eta && (

        <Text style={styles.eta}>
          ⏱ {eta} min restantes
        </Text>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 999,
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 20,
  },

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  instruction: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },

  eta: {
    color: '#60a5fa',
    marginTop: 10,
    fontWeight: '700',
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

Muestra texto en pantalla.

---

# 🎨 StyleSheet

Permite crear estilos.

---

# 🧩 Props

```tsx
type Props = {
 instruction: string;
 eta: number | null;
};
```

---

# 🧭 instruction

Texto de navegación actual.

Ejemplos:

```txt
"Gira a la derecha"
"Continúa recto"
"Toma la rotonda"
```

---

# ⏱️ eta

Tiempo restante estimado.

---

# 🖥️ Componente principal

```tsx
export default function NavigationPanel()
```

---

## ¿Qué hace?

Crea el panel superior.

---

# 🖥️ Return

```tsx
return (
 <View>
 </View>
)
```

---

# 🧭 Título

```tsx
<Text>
 🧭 Navegación
</Text>
```

---

## ¿Qué hace?

Muestra el título del panel.

---

# 🧭 instruction

```tsx
<Text>
 {instruction}
</Text>
```

---

## ¿Qué hace?

Muestra la instrucción actual.

---

# ❓ eta &&

```tsx
{eta && (
```

---

## ¿Qué significa?

“Mostrar esto SOLO si existe ETA”.

---

# ⏱️ ETA

```tsx
<Text>
 ⏱ {eta} min restantes
</Text>
```

---

## ¿Qué hace?

Muestra tiempo restante.

---

# 🎨 container

```tsx
container: {
 position: 'absolute',
 top: 50,
}
```

---

## position: absolute

Hace que el panel flote sobre el mapa.

---

## top: 50

Lo mueve hacia abajo desde arriba.

---

## left y right

Separación lateral.

---

## zIndex

Hace que quede por encima del mapa.

---

## backgroundColor

Color del panel.

---

## borderRadius

Bordes redondeados.

---

# 🎨 title

```tsx
title: {
 color: 'white',
}
```

---

## ¿Qué hace?

Estiliza el título.

---

# 🎨 instruction

Controla apariencia de instrucciones.

---

# 🎨 eta

Controla apariencia del tiempo restante.

---

# 🔄 Flujo completo

```txt
Usuario inicia navegación
↓
NavigationPanel aparece
↓
Ruta calcula ETA
↓
Instrucción cambia
↓
Panel se actualiza
```