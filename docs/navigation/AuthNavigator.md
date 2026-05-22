# AuthNavigator

# 📌 ¿Qué hace este archivo?

Este archivo controla TODA la navegación principal de la aplicación.

Decide:

- qué pantallas existen
- cómo cambiar entre ellas
- cuál aparece primero

Es el sistema central de navegación de la app.

---

# 📁 Ubicación

```txt
src/navigation/AuthNavigator.tsx
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

import LoginScreen from '../screens/LoginScreen';

import HomeScreen from '../screens/HomeScreen';

const Stack =
  createNativeStackNavigator();

export default function AuthNavigator() {

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

Crea navegación tipo Stack.

---

# 📚 ¿Qué es Stack Navigation?

Es una navegación tipo “pila”.

Ejemplo:

```txt
Login
↓
Home
↓
Perfil
```

Cada pantalla se coloca encima de otra.

---

# 📦 Screens

```tsx
import LoginScreen
import HomeScreen
```

---

## ¿Qué hace?

Importa pantallas reales.

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

# 🖥️ AuthNavigator()

```tsx
export default function AuthNavigator()
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

Sin esto la navegación no funciona.

---

# 📚 Stack.Navigator

```tsx
<Stack.Navigator>
```

---

## ¿Qué hace?

Contiene TODAS las pantallas.

---

# ⚙️ screenOptions

```tsx
screenOptions={{
 headerShown: false,
}}
```

---

## ¿Qué hace?

Oculta el header automático.

---

# 📱 Stack.Screen

```tsx
<Stack.Screen />
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

Nombre interno de navegación.

---

# 🖥️ component

```tsx
component={LoginScreen}
```

---

## ¿Qué hace?

Le dice qué pantalla renderizar.

---

# 📱 LoginScreen

```tsx
<Stack.Screen
 name="Login"
 component={LoginScreen}
/>
```

---

## ¿Qué hace?

Agrega pantalla Login.

---

# 🏠 HomeScreen

```tsx
<Stack.Screen
 name="Home"
 component={HomeScreen}
/>
```

---

## ¿Qué hace?

Agrega pantalla principal Home.

---

# 🔄 Flujo completo

```txt
App inicia
↓
AuthNavigator carga
↓
NavigationContainer activa navegación
↓
Stack.Navigator carga pantallas
↓
LoginScreen aparece
↓
Usuario inicia sesión
↓
navigate('Home')
↓
HomeScreen aparece
```

---

# 📌 ¿Por qué separar la navegación?

Porque en apps grandes hay MUCHAS pantallas.

Separar navegación permite:

```txt
✅ Código más limpio
✅ Mejor organización
✅ Más escalable
✅ Más fácil de mantener
✅ Arquitectura más profesional
```

---

# 📌 ¿Qué es React Navigation?

Es la librería que permite:

```txt
✅ Cambiar pantallas
✅ Navegar entre vistas
✅ Crear stacks
✅ Crear tabs
✅ Crear drawers
```

---

# 📌 ¿Qué significa navigate()?

Ejemplo:

```tsx
navigation.navigate('Home');
```

---

## ¿Qué hace?

Cambia a otra pantalla.

---

# 📌 Flujo real dentro de la app

```txt
Usuario abre app
↓
AuthNavigator inicia
↓
LoginScreen aparece
↓
Usuario inicia sesión
↓
navigate('Home')
↓
HomeScreen carga
↓
Usuario usa GPS y navegación
```