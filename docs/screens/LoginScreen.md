# LoginScreen

# 📌 ¿Qué hace esta pantalla?

Esta pantalla maneja el inicio de sesión.

Permite:

- escribir email
- escribir contraseña
- validar login
- entrar a la aplicación

Es la primera pantalla que ve el usuario.

---

# 📁 Ubicación

```txt
src/screens/LoginScreen.tsx
```

---

# 🧠 Responsabilidades principales

```txt
✅ Inputs de login
✅ Manejo de estados
✅ Validar usuario
✅ Navegar a Home
✅ Mostrar errores
```

---

# 📦 Imports principales

```tsx
import TextInput
import TouchableOpacity
import Text
import View
```

---

## ¿Qué hacen?

Crean la interfaz visual.

---

# 📦 useState

```tsx
import useState
```

---

## ¿Qué hace?

Guarda datos dinámicos.

---

# 📦 useNavigation

```tsx
import useNavigation
```

---

## ¿Qué hace?

Permite cambiar de pantalla.

---

# 📦 useAuth

```tsx
import useAuth
```

---

## ¿Qué hace?

Controla login/logout.

---

# 🧠 Estados principales

# 📧 email

```tsx
const [email, setEmail]
```

---

## ¿Qué guarda?

Texto del email.

---

# 🔑 password

```tsx
const [password, setPassword]
```

---

## ¿Qué guarda?

Texto de contraseña.

---

# 🖥️ TextInput

```tsx
<TextInput />
```

---

## ¿Qué hace?

Permite escribir texto.

---

# 📧 Email input

```tsx
<TextInput
 placeholder="Email"
/>
```

---

## ¿Qué hace?

Input para email.

---

# 🔑 Password input

```tsx
<TextInput
 secureTextEntry
/>
```

---

## ¿Qué hace?

Oculta contraseña.

---

# 👆 TouchableOpacity

```tsx
<TouchableOpacity />
```

---

## ¿Qué hace?

Crea botón presionable.

---

# 🔐 login()

```tsx
login(email, password)
```

---

## ¿Qué hace?

Valida credenciales.

---

# 🧭 navigation.navigate()

```tsx
navigation.navigate('Home')
```

---

## ¿Qué hace?

Abre HomeScreen.

---

# ❌ Alert.alert()

```tsx
Alert.alert()
```

---

## ¿Qué hace?

Muestra errores.

---

# 🔄 Flujo completo

```txt
Usuario abre app
↓
LoginScreen aparece
↓
Usuario escribe email
↓
Usuario escribe password
↓
Presiona botón
↓
login() valida datos
↓
Si es correcto:
↓
navigate('Home')
↓
Mapa principal aparece
```

---

# 📌 ¿Por qué separar LoginScreen?

Porque login es una responsabilidad distinta.

No debe mezclarse con:

```txt
❌ GPS
❌ mapas
❌ navegación
```

---

# 📌 Arquitectura correcta

```txt
LoginScreen
↓
Auth
↓
HomeScreen
↓
Mapa + GPS + Navegación
```