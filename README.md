# ParkSmart - App de Parkings

Una aplicación móvil simplificada para encontrar y marcar rutas hacia parkings usando Google Maps.

## Características

- ✅ Login y Registro con Firebase
- ✅ Autenticación persistente
- ✅ Lista de parkings disponibles
- ✅ Abre Google Maps directamente con las coordenadas del parking
- ✅ Base de datos con Firebase Firestore

## Setup

### 1. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication (Email/Password)
3. Copia tu configuración de Firebase
4. Actualiza `src/config/firebase.ts` con tu configuración:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr la app

```bash
npm start
# o para Android
npm run android
# o para iOS
npm run ios
```

## Estructura del Proyecto

```
src/
├── config/        # Configuración (Firebase)
├── context/       # Context API (Autenticación)
├── navigation/    # Navegación (Auth y Home)
├── screens/       # Pantallas (Login, Register, Home)
├── styles/        # Estilos globales
├── types/         # Tipos TypeScript
└── utils/         # Utilidades (Google Maps, datos mock)
```

## Pantallas

- **LoginScreen**: Inicio de sesión
- **RegisterScreen**: Creación de cuenta
- **HomeScreen**: Lista de parkings con botón para abrir Google Maps

## Funcionalidad Principal

Al presionar "Abrir en Google Maps" en cualquier parking, se abre la app de Google Maps (o el navegador) con las coordenadas del parking.

## Dependencias Principales

- `firebase`: Autenticación y base de datos
- `@react-navigation`: Navegación entre pantallas
- `expo`: Framework React Native
