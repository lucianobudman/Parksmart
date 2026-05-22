# useAuth

# 📌 ¿Qué hace este hook?

Este hook maneja TODO el sistema de autenticación de usuarios.

Se encarga de:

- guardar usuario logueado
- iniciar sesión
- cerrar sesión
- verificar autenticación

La idea es separar toda la lógica de login del resto de la aplicación.

---

# 📁 Ubicación

```txt
src/hooks/useAuth.ts
```

---

# 🧠 Código completo

```tsx
import {
  useState,
} from 'react';

export default function useAuth() {

  const [user, setUser] =
    useState<any>(null);

  const login = (
    email: string,
    password: string
  ) => {

    if (
      email === 'admin@test.com' &&
      password === '1234'
    ) {

      setUser({
        email,
        name: 'Administrador',
      });

      return true;
    }

    return false;
  };

  const logout = () => {

    setUser(null);

  };

  return {

    user,

    login,

    logout,
  };
}
```

---

# 🧠 Explicación COMPLETA

# 📦 Imports

```tsx
import {
 useState,
} from 'react';
```

---

# 🧠 useState

Permite guardar datos dinámicos.

En este caso:

- usuario logueado

---

# 🧩 user

```tsx
const [user, setUser]
```

---

## ¿Qué guarda?

Información del usuario actual.

---

# 📌 Valor inicial

```tsx
useState<any>(null)
```

---

## ¿Qué significa?

Al iniciar la app:

```txt
NO hay usuario logueado
```

Por eso empieza en:

```txt
null
```

---

# 🔐 login()

```tsx
const login = (
 email,
 password
)
```

---

## ¿Qué hace?

Intenta iniciar sesión.

---

# 📧 Parámetro email

```tsx
email: string
```

---

## ¿Qué contiene?

El email que escribe el usuario.

---

# 🔑 Parámetro password

```tsx
password: string
```

---

## ¿Qué contiene?

La contraseña.

---

# ❓ if()

```tsx
if (
 email === 'admin@test.com' &&
 password === '1234'
)
```

---

## ¿Qué hace?

Verifica si:

- email correcto
- contraseña correcta

---

# ⚠️ IMPORTANTE

Esto es un login FAKE/simple.

Todavía NO usa:

- backend
- base de datos
- API
- Firebase

---

# 👤 setUser()

```tsx
setUser({
 email,
 name: 'Administrador',
});
```

---

## ¿Qué hace?

Guarda el usuario logueado.

---

# 📧 email

Guarda el email.

---

# 👤 name

Guarda nombre del usuario.

---

# ✅ return true

```tsx
return true;
```

---

## ¿Qué hace?

Indica que el login salió bien.

---

# ❌ return false

```tsx
return false;
```

---

## ¿Qué hace?

Indica que el login falló.

---

# 🚪 logout()

```tsx
const logout = () => {
 setUser(null);
}
```

---

## ¿Qué hace?

Cierra sesión.

---

# 🧹 setUser(null)

```tsx
setUser(null)
```

---

## ¿Qué hace?

Borra usuario actual.

---

# 📤 return

```tsx
return {
 user,
 login,
 logout,
}
```

---

## ¿Qué hace?

Devuelve funciones y datos.

---

# 👤 user

Devuelve usuario actual.

---

# 🔐 login

Devuelve función login.

---

# 🚪 logout

Devuelve función logout.

---

# 🔄 Flujo completo

```txt
Usuario abre app
↓
user = null
↓
Usuario escribe email
↓
Usuario escribe password
↓
login() se ejecuta
↓
if verifica datos
↓
setUser guarda usuario
↓
App detecta sesión iniciada
↓
Usuario usa app
↓
logout() elimina sesión
```

---

# 📌 ¿Por qué usar hooks?

Porque permiten reutilizar lógica.

En vez de repetir login en muchas pantallas:

```txt
❌ código repetido
```

hacemos:

```txt
✅ useAuth()
```

y reutilizamos todo.

---

# 📌 Ventajas reales

```txt
✅ Código más limpio
✅ Más modular
✅ Más fácil de mantener
✅ Menos código repetido
✅ Más profesional
```