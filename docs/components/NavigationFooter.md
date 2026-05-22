# NavigationFooter

# 📌 ¿Qué hace este componente?

Este componente muestra el modo navegación fullscreen.

Aparece cuando el usuario selecciona un estacionamiento y comienza la navegación.

---

# 📁 Ubicación

```txt
src/components/NavigationFooter.tsx
```

---

# 🧠 Código completo

```tsx
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  eta: number | null;

  currentInstruction: string;

  currentStepIndex: number;

  totalSteps: number;

  onFinish: () => void;
};

export default function NavigationFooter({
  eta,
  currentInstruction,
  currentStepIndex,
  totalSteps,
  onFinish,
}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.eta}>
        ⏱ {eta || 0} min
      </Text>

      <Text style={styles.instruction}>
        {currentInstruction}
      </Text>

      <Text style={styles.steps}>
        Paso {currentStepIndex + 1}
        {' / '}
        {totalSteps}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onFinish}
      >

        <Text style={styles.buttonText}>
          Finalizar navegación
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#111827',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  eta: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },

  instruction: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },

  steps: {
    color: 'white',
    marginTop: 10,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
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
 TouchableOpacity,
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

# 👆 TouchableOpacity

Botón presionable.

---

# 🎨 StyleSheet

Permite crear estilos.

---

# 🧩 Props

```tsx
type Props = {
 eta: number | null;
 currentInstruction: string;
 currentStepIndex: number;
 totalSteps: number;
 onFinish: () => void;
};
```

---

# ⏱️ eta

Tiempo estimado restante.

---

# 🧭 currentInstruction

Instrucción actual.

Ejemplo:

```txt
"Gira a la derecha"
```

---

# 👣 currentStepIndex

Paso actual.

---

# 📍 totalSteps

Cantidad total de pasos.

---

# ❌ onFinish

Función que finaliza navegación.

---

# 🖥️ Return

```tsx
return (
 <View>
 </View>
)
```

---

# ⏱️ ETA

```tsx
<Text>
 ⏱ {eta || 0} min
</Text>
```

---

## ¿Qué hace?

Muestra tiempo restante.

---

# 🧭 Instrucción

```tsx
<Text>
 {currentInstruction}
</Text>
```

---

## ¿Qué hace?

Muestra indicación actual.

---

# 👣 Pasos

```tsx
Paso {currentStepIndex + 1}
```

---

## ¿Por qué +1?

Porque los arrays empiezan desde 0.

Pero para humanos:

```txt
1, 2, 3...
```

---

# 👆 TouchableOpacity

```tsx
<TouchableOpacity
 onPress={onFinish}
>
```

---

## ¿Qué hace?

Cuando el usuario toca el botón:

- termina navegación
- limpia ruta
- limpia estado

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

Fija el panel abajo.

---

# 🎨 backgroundColor

Color del panel.

---

# 🎨 borderRadius

Bordes redondeados.

---

# 🔄 Flujo completo

```txt
Usuario selecciona parking
↓
NavigationFooter aparece
↓
Se muestran instrucciones
↓
Se actualiza ETA
↓
Usuario finaliza navegación
↓
Footer desaparece
```