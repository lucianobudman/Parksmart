# RegisterScreen

# 📌 ¿Qué hace esta pantalla?

Esta pantalla permite registrar nuevos usuarios en la aplicación.

El usuario puede:

- escribir nombre
- escribir email
- escribir contraseña
- confirmar contraseña
- crear cuenta

Es la pantalla de registro de la app.

---

# 📁 Ubicación

```txt
src/screens/RegisterScreen.tsx
```

---

# 🧠 Responsabilidades principales

```txt
✅ Inputs de registro
✅ Validación de datos
✅ Confirmar contraseña
✅ Crear usuario
✅ Navegar al login
✅ Mostrar errores
```

---

# 📦 Imports principales

```tsx
import View
import Text
import TextInput
import TouchableOpacity
import Alert
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

# 🧠 Estados principales

# 👤 name

```tsx
const [name, setName]
```

---

## ¿Qué guarda?

Nombre del usuario.

---

# 📧 email

```tsx
const [email, setEmail]
```

---

## ¿Qué guarda?

Email del usuario.

---

# 🔑 password

```tsx
const [password, setPassword]
```

---

## ¿Qué guarda?

Contraseña.

---

# 🔐 confirmPassword

```tsx
const [confirmPassword]
```

---

## ¿Qué guarda?

Confirmación de contraseña.

---

# 🖥️ TextInput

```tsx
<TextInput />
```

---

## ¿Qué hace?

Permite escribir texto.

---

# 👤 Input nombre

```tsx
<TextInput
 placeholder="Nombre"
/>
```

---

## ¿Qué hace?

Permite escribir nombre.

---

# 📧 Input email

```tsx
<TextInput
 placeholder="Email"
/>
```

---

## ¿Qué hace?

Permite escribir email.

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

# 🔐 Confirm password

```tsx
<TextInput
 secureTextEntry
/>
```

---

## ¿Qué hace?

Oculta confirmación de contraseña.

---

# 👆 TouchableOpacity

```tsx
<TouchableOpacity />
```

---

## ¿Qué hace?

Crea botón presionable.

---

# 🧠 handleRegister()

```tsx
const handleRegister = ()
```

---

## ¿Qué hace?

Maneja el registro.

---

# ❓ Validaciones

```tsx
if (!name || !email)
```

---

## ¿Qué hace?

Verifica campos vacíos.

---

# 🔐 password !== confirmPassword

```tsx
if (
 password !== confirmPassword
)
```

---

## ¿Qué hace?

Verifica que ambas contraseñas coincidan.

---

# ❌ Alert.alert()

```tsx
Alert.alert()
```

---

## ¿Qué hace?

Muestra errores.

---

# ✅ Registro exitoso

```tsx
Alert.alert(
 'Cuenta creada'
)
```

---

## ¿Qué hace?

Indica registro correcto.

---

# 🧭 navigation.navigate()

```tsx
navigation.navigate('Login')
```

---

## ¿Qué hace?

Vuelve al login.

---

# 🔄 Flujo completo

```txt
Usuario abre RegisterScreen
↓
Escribe nombre
↓
Escribe email
↓
Escribe contraseña
↓
Confirma contraseña
↓
Presiona registrarse
↓
Validaciones se ejecutan
↓
Si todo está bien:
↓
Cuenta creada
↓
navigate('Login')
↓
Usuario inicia sesión
```

---

# 📌 ¿Por qué separar RegisterScreen?

Porque registro tiene lógica distinta.

No debe mezclarse con:

```txt
❌ GPS
❌ mapas
❌ navegación
```

---

# 📌 Arquitectura correcta

```txt
RegisterScreen
↓
LoginScreen
↓
Auth
↓
HomeScreen
```

---

# 📌 ¿Qué suele agregarse más adelante?

Normalmente:

```txt
✅ Backend
✅ Firebase
✅ JWT
✅ Base de datos
✅ Validación email
✅ Recuperar contraseña
✅ OAuth
```