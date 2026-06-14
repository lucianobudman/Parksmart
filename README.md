# ParkSmart

Aplicación móvil en React Native con Expo para ver parkings cercanos, seleccionar el tipo de vehículo y abrir ubicaciones en Google Maps.

## ✨ Características

- Autenticación con Firebase (login, registro y cierre de sesión)
- Selección de vehículo para filtrar parkings disponibles
- Lista de parkings cercanos en un radio de 4 km
- Cálculo de distancia entre la ubicación del usuario y cada parking
- Apertura rápida de la ubicación en Google Maps
- Fallback de ubicación para mostrar parkings aunque no se concedan permisos
- Guardado de parkings favoritos por usuario con una pestaña independiente para verlos
- Navegación por pestañas entre Parkings y Favoritos

## 🚀 Requisitos

- Node.js 18+
- npm o yarn
- Expo Go o un emulador Android

## ▶️ Instalación

1. Clona el proyecto
2. Instala dependencias:

```bash
npm install
```

3. Inicia la app:

```bash
npm start
```

Opcionalmente:

```bash
npm run android
npm run web
```

## 🔧 Configuración de Firebase

1. Crea un proyecto en Firebase Console.
2. Activa Authentication con el proveedor Email/Password.
3. Copia la configuración de tu proyecto y reemplázala en [src/config/firebase.ts](src/config/firebase.ts).

## 📁 Estructura del proyecto

```text
src/
├── config/
│   └── firebase.ts
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useUserLocation.ts
├── navigation/
│   ├── AppNavigator.tsx
│   └── AuthNavigator.tsx
├── screens/
│   ├── FavoritesScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── VehicleSelectionScreen.tsx
├── services/
│   ├── favoritesService.ts
│   └── parkingService.ts
├── styles/
│   └── global.ts
├── types/
│   └── auth.ts
└── utils/
    └── googleMapsUtils.ts
```

## 🧩 Estado actual del proyecto

La app usa datos mock de parkings precargados para mostrar resultados de forma inmediata. Si la ubicación no está disponible, emplea una ubicación de respaldo para que la lista siga siendo visible. Además, los favoritos se guardan por usuario en Firebase para que estén disponibles en futuras sesiones.

## 🛠️ Notas

- El listado de parkings se filtra por tipo de vehículo cuando el usuario lo ha seleccionado.
- La pantalla principal incluye un botón para agregar un parking de prueba en la ubicación actual.
- Los usuarios pueden marcar parkings como favoritos desde la lista principal y verlos en una pestaña aparte.
- La app está preparada para evolucionar a una fuente de datos real desde Firebase o un backend propio.
- La interfaz usa Safe Area para mejorar la experiencia en celulares con barra de navegación virtual.

### 2. **RegisterScreen**
- Email, contraseña, confirmar contraseña
- Validaciones (contraseña mínimo 6 caracteres)
- Botón "Registrarse"
- Link a "Inicia sesión"

### 3. **HomeScreen**
- Muestra email de sesión
- Botón "Salir" (logout)
- Lista de parkings cercanos
- Cada parking muestra: nombre, tarifa, distancia
- Botón para guardar como favorito
- Botón "Abrir en Google Maps"

### 4. **FavoritesScreen**
- Muestra los parkings guardados como favoritos
- Permite abrirlos en Google Maps
- Permite quitarlos de favoritos
- Se accede desde la barra inferior de navegación

---

## 🔄 Flujo de la App

```
1. Usuario abre app
   ↓
2. AuthContext verifica si está logueado
   ├─ SÍ → Muestra HomeScreen
   └─ NO → Muestra LoginScreen
   
3. En LoginScreen:
   - Opción 1: Inicia sesión (email + pass) → HomeScreen
   - Opción 2: Va a RegisterScreen
   
4. En RegisterScreen:
   - Crea cuenta nueva → Login automático → HomeScreen
   - O vuelve a LoginScreen
   
5. En HomeScreen:
   - App obtiene ubicación GPS
   - Busca parkings dentro de 4km
   - Muestra lista ordenada por distancia
   - Usuario puede guardar un parking como favorito
   - Usuario presiona "Abrir en Google Maps"
   - Se abre Google Maps con la ruta

6. En FavoritesScreen:
   - Se muestran los parkings guardados como favoritos
   - El usuario puede volver a abrirlos o quitarlos de favoritos
```

---

## 🔐 Seguridad

- ✅ Contraseñas nunca se ven (campo `secureTextEntry`)
- ✅ Firebase maneja autenticación de forma segura
- ✅ Credenciales de Firebase en `firebase.ts`
- ✅ Permisos de ubicación solicitados al usuario

---

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| firebase | 12.13.0 | Autenticación y base de datos |
| @react-navigation | 7.2.4 | Navegación entre pantallas |
| expo-location | 19.0.8 | Obtener ubicación GPS |
| expo | 54.0.33 | Framework React Native |
| react-native | 0.81.5 | Framework móvil |

---

## 🐛 Troubleshooting

### "Permiso de ubicación denegado"
- Ve a Configuración → Apps → ParkSmart → Permisos → Ubicación → Permitir

### "No hay parkings cercanos"
- Los parkings mock están alrededor de Buenos Aires (-34.60, -58.38)
- Verifica que tu ubicación esté cerca

### "Error de Firebase"
- Revisa credenciales en `src/config/firebase.ts`
- Asegúrate que Authentication está habilitado en Firebase Console

---

## 📝 Notas

- **Parkings mock**: Actualmente usa datos ficticios. Puedes conectar una API real
- **Radio de búsqueda**: Configurable en `HomeScreen.tsx` (actualmente 4km)
- **Distancia en km**: Se calcula automáticamente según ubicación del usuario

