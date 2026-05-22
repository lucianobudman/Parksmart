# AppNavigator

# 📌 ¿Qué hace este archivo?

Este archivo controla TODA la navegación de la aplicación.

Es el “director” que decide:

- qué pantalla mostrar
- cómo cambiar entre pantallas
- qué pantalla inicia primero

Sin este archivo, la app no podría moverse entre pantallas.

---

# 📁 Ubicación

```txt
src/navigation/AppNavigator.tsx
```

---

# 🧠 Código completo

```tsx
import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

import LoginScreen from '../screens/LoginScreen';

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 NavigationContainer,
} from '@react-navigation/native';
```

---

# 🧭 NavigationContainer

Es el contenedor principal de navegación.

Toda la navegación vive dentro de él.

---

# 📦 createNativeStackNavigator

```tsx
import {
 createNativeStackNavigator,
} from '@react-navigation/native-stack';
```

---

## ¿Qué hace?

Crea navegación tipo “stack”.

---

# 📱 ¿Qué es un Stack?

Funciona como una pila.

Ejemplo:

```txt
Login
↓
Home
↓
Perfil
```

Cada pantalla se apila encima de la otra.

---

# 📦 Screens

```tsx
import HomeScreen
import LoginScreen
```

---

## ¿Qué hace?

Importa pantallas.

---

# 🧠 Stack

```tsx
const Stack =
 createNativeStackNavigator();
```

---

## ¿Qué hace?

Crea el sistema de navegación.

---

# 🖥️ AppNavigator()

```tsx
export default function AppNavigator()
```

---

## ¿Qué hace?

Crea el componente principal de navegación.

---

# 🧭 NavigationContainer

```tsx
<NavigationContainer>
```

---

## ¿Qué hace?

Activa React Navigation.

---

# 📚 Stack.Navigator

```tsx
<Stack.Navigator>
```

---

## ¿Qué hace?

Contiene todas las pantallas.

---

# ⚙️ screenOptions

```tsx
screenOptions={{
 headerShown: false,
}}
```

---

## ¿Qué hace?

Oculta header automático.

---

# 📱 Stack.Screen

```tsx
<Stack.Screen
 name="Login"
 component={LoginScreen}
/>
```

---

## ¿Qué hace?

Registra una pantalla.

---

# 🏷️ name

```tsx
name="Login"
```

---

## ¿Qué hace?

Nombre interno de la pantalla.

---

# 🖥️ component

```tsx
component={LoginScreen}
```

---

## ¿Qué hace?

Le dice qué componente mostrar.

---

# 📱 HomeScreen

```tsx
<Stack.Screen
 name="Home"
 component={HomeScreen}
/>
```

---

## ¿Qué hace?

Registra pantalla Home.

---

# 🔄 Flujo completo

```txt
App inicia
↓
NavigationContainer carga
↓
Stack.Navigator inicia
↓
Pantalla Login aparece
↓
Usuario inicia sesión
↓
navigate('Home')
↓
HomeScreen aparece
```

---

# 📌 ¿Por qué separar navegación?

Porque en apps grandes hay MUCHAS pantallas.

Separarlo permite:

```txt
✅ Código más limpio
✅ Mejor organización
✅ Más escalable
✅ Más profesional
```