# ParkSmart

ParkSmart es una aplicación móvil hecha con React Native + Expo para encontrar parkings cercanos, filtrar por tipo de vehículo y guardar favoritos por usuario.

## ✨ Funcionalidades principales

- Inicio de sesión y registro con Firebase.
- Selección de vehículo al primer acceso para adaptar los resultados.
- Búsqueda de parkings según un radio configurable entre 1 y 10 km.
- Cálculo de distancia desde la ubicación actual del usuario.
- Apertura directa de cada parking en Google Maps.
- Lista de favoritos por usuario almacenada en Firestore.
- Panel de configuración para ver el correo y cambiar la contraseña.
- Modo administrador para crear nuevos parkings desde la app.

## 🛠️ Tecnologías usadas

- React Native
- Expo
- Firebase Auth
- Firebase Firestore
- React Navigation
- Expo Location
- React Native Slider

## 📦 Requisitos

- Node.js 18 o superior
- npm
- Expo Go o un emulador Android/iOS
- Un proyecto de Firebase configurado

## ▶️ Instalación

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Configura Firebase siguiendo la sección correspondiente.
4. Inicia la aplicación:

```bash
npm start
```

---

## ▶️ Ejecutar la app

```bash
npm start
```

Opcionalmente puedes correr la app directamente en Android o Web:

```bash
npm run android
npm run web
```

## 🔐 Configuración de Firebase

1. Crea un proyecto en Firebase Console.
2. Activa Authentication con el proveedor Email/Password.
3. Activa Firestore Database.
4. Copia la configuración del proyecto y reemplázala en [src/config/firebase.ts](src/config/firebase.ts).

> Si el proyecto no tiene la colección `parkings` o la subcolección `favorites`, la app seguirá funcionando con datos de respaldo y con la lógica de favoritos del usuario.

## 📁 Estructura del proyecto

```text
.
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── README.md
├── docs/
├── src/
│   ├── components/
│   │   ├── CreateParkingForm.tsx
│   │   └── ParkingCard.tsx
│   ├── config/
│   │   └── firebase.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useUserLocation.ts
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/
│   │   ├── FavoritesScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── UserConfigScreen.tsx
│   │   └── VehicleSelectionScreen.tsx
│   ├── services/
│   │   ├── favoritesService.ts
│   │   └── parkingService.ts
│   ├── styles/
│   │   └── global.ts
│   ├── types/
│   │   └── auth.ts
│   └── utils/
│       └── googleMapsUtils.ts
```
## 📚 Documentación

Puedes consultar la documentación detallada del proyecto aquí:

- [Documentación completa](docs/README.md)

## 🔄 Flujo general de la app

1. La app inicia y verifica si existe una sesión activa.
2. Si el usuario no está autenticado, se muestra el flujo de login/registro.
3. Si el usuario no eligió su vehículo, se le pide seleccionarlo.
4. Una vez autenticado, se muestran las pestañas de Parkings y Favoritos.
5. En la pantalla principal se cargan los parkings cercanos y se filtran por radio y vehículo.
6. El usuario puede abrir la ubicación en Google Maps o guardar un parking como favorito.

## 🧭 Pantallas principales

- `LoginScreen`: acceso con email y contraseña.
- `RegisterScreen`: creación de cuenta y validación de contraseña.
- `VehicleSelectionScreen`: selección del tipo de vehículo.
- `HomeScreen`: listado de parkings, radio, favoritos y creación de parkings (admin).
- `FavoritesScreen`: parkings guardados por el usuario.
- `UserConfigScreen`: información del usuario y cambio de contraseña.

## 🧪 Nota importante sobre datos

La app incluye parkings mock para mostrar resultados aunque no haya datos reales disponibles. Además, si el permiso de ubicación está denegado, se usa una ubicación de respaldo para que la experiencia siga funcionando.

## 🐞 Solución rápida de problemas

- Si no aparecen parkings, revisa el permiso de ubicación y el radio seleccionado.
- Si Firebase da error, verifica que `auth` y `firestore` estén habilitados.
- Si la versión de la app no carga correctamente, vuelve a ejecutar `npm install`.

