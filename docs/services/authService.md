# authService

# 📌 ¿Qué hace este archivo?

Este service se encarga de manejar la autenticación de usuarios.

Su responsabilidad es:

- iniciar sesión
- registrar usuarios
- cerrar sesión
- validar credenciales

Actualmente usa datos simulados (fake login).

Más adelante puede conectarse a una base de datos real o backend.

---

# 📁 Ubicación

```txt
src/services/authService.ts
```

---

# 🧠 Código completo

```tsx
export async function loginUser(
  email: string,
  password: string
) {

  if (
    email === 'admin@test.com' &&
    password === '1234'
  ) {

    return {
      success: true,

      user: {
        id: 1,
        name: 'Administrador',
        email,
      },
    };
  }

  return {
    success: false,
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {

  return {

    success: true,

    user: {
      id: 2,
      name,
      email,
    },
  };
}
```

---

# 🧠 Explicación COMPLETA

# 📦 export async function

```tsx
export async function
```

---

## ¿Qué hace?

Exporta una función asíncrona.

Permite usarla desde otros archivos.

---

# ⚡ async

```tsx
async
```

---

## ¿Qué significa?

La función puede tardar tiempo.

Normalmente porque:

```txt
✅ consulta internet
✅ consulta base de datos
✅ consulta backend
```

---

# 🔐 loginUser()

```tsx
loginUser()
```

---

## ¿Qué hace?

Intenta iniciar sesión.

---

# 📧 email

```tsx
email: string
```

---

## ¿Qué representa?

Email ingresado por el usuario.

---

# 🔑 password

```tsx
password: string
```

---

## ¿Qué representa?

Contraseña ingresada.

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

Verifica credenciales.

---

# ⚠️ IMPORTANTE

Esto NO es un login real.

Es solamente:

```txt
FAKE LOGIN
```

para desarrollo.

---

# ✅ success: true

```tsx
success: true
```

---

## ¿Qué significa?

Login exitoso.

---

# 👤 user

```tsx
user: {}
```

---

## ¿Qué contiene?

Información del usuario.

---

# 🆔 id

```tsx
id: 1
```

---

## ¿Qué representa?

Identificador único.

---

# 👤 name

```tsx
name: 'Administrador'
```

---

## ¿Qué representa?

Nombre del usuario.

---

# 📧 email

```tsx
email
```

---

## ¿Qué representa?

Email del usuario.

---

# ❌ success: false

```tsx
success: false
```

---

## ¿Qué significa?

Login incorrecto.

---

# 📝 registerUser()

```tsx
registerUser()
```

---

## ¿Qué hace?

Simula registro de usuario.

---

# 👤 name

```tsx
name: string
```

---

## ¿Qué representa?

Nombre del usuario.

---

# 📧 email

```tsx
email: string
```

---

## ¿Qué representa?

Email del usuario.

---

# 🔑 password

```tsx
password: string
```

---

## ¿Qué representa?

Contraseña.

---

# 📦 return

```tsx
return {}
```

---

## ¿Qué hace?

Devuelve usuario registrado.

---

# ⚠️ IMPORTANTE

Actualmente NO guarda usuarios reales.

NO existe:

```txt
❌ Base de datos
❌ Firebase
❌ MongoDB
❌ Backend
```

---

# 📌 ¿Por qué usar authService?

Porque separa:

```txt
❌ lógica visual
de
✅ lógica de autenticación
```

---

# 📌 Arquitectura correcta

```txt
Screen
↓
Hook
↓
Service
↓
Backend/API
```

---

# 🔄 Flujo completo LOGIN

```txt
Usuario escribe email
↓
Usuario escribe password
↓
loginUser()
↓
if valida datos
↓
success = true
↓
App inicia sesión
```

---

# 🔄 Flujo completo REGISTER

```txt
Usuario completa formulario
↓
registerUser()
↓
Usuario fake se crea
↓
success = true
↓
App redirige al login
```

---

# 📌 Más adelante podría usar:

```txt
✅ Firebase Auth
✅ JWT
✅ Supabase
✅ MongoDB
✅ PostgreSQL
✅ OAuth
```

---

# 📌 ¿Por qué modularizar services?

Porque evita:

```txt
❌ lógica gigante en screens
```

y permite:

```txt
✅ código limpio
✅ reutilización
✅ mantenimiento fácil
✅ arquitectura profesional
```