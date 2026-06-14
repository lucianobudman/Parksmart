# Carpeta screens

## Objetivo
Contiene todas las pantallas visibles de la app.

## Archivos principales

- [src/screens/HomeScreen.tsx](../src/screens/HomeScreen.tsx)
- [src/screens/LoginScreen.tsx](../src/screens/LoginScreen.tsx)
- [src/screens/RegisterScreen.tsx](../src/screens/RegisterScreen.tsx)
- [src/screens/VehicleSelectionScreen.tsx](../src/screens/VehicleSelectionScreen.tsx)
- [src/screens/FavoritesScreen.tsx](../src/screens/FavoritesScreen.tsx)

### HomeScreen
- muestra los parkings cercanos
- obtiene ubicación y calcula distancias
- permite abrir el parking en Google Maps
- permite marcarlo como favorito

### LoginScreen
- permite iniciar sesión con email y contraseña
- navega a registro si el usuario no tiene cuenta

### RegisterScreen
- permite crear una cuenta nueva
- valida que la contraseña tenga un mínimo de caracteres

### VehicleSelectionScreen
- permite elegir el tipo de vehículo
- se usa al iniciar por primera vez para filtrar parkings

### FavoritesScreen
- muestra los parkings guardados por el usuario
- permite abrirlos en maps o quitarles el favorito
