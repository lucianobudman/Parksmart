# Pantallas

## Objetivo
Esta carpeta contiene todas las pantallas visibles de la app.

## Archivos principales

- [src/screens/HomeScreen.tsx](../src/screens/HomeScreen.tsx)
- [src/screens/LoginScreen.tsx](../src/screens/LoginScreen.tsx)
- [src/screens/RegisterScreen.tsx](../src/screens/RegisterScreen.tsx)
- [src/screens/VehicleSelectionScreen.tsx](../src/screens/VehicleSelectionScreen.tsx)
- [src/screens/FavoritesScreen.tsx](../src/screens/FavoritesScreen.tsx)
- [src/screens/UserConfigScreen.tsx](../src/screens/UserConfigScreen.tsx)

## HomeScreen

- muestra la lista de parkings cercanos
- usa el radio configurado por el usuario
- permite abrir la ubicación en Google Maps
- permite marcar o desmarcar favoritos
- si el usuario es admin, puede crear nuevos parkings desde un formulario

## LoginScreen

- recibe email y contraseña
- valida que los campos no estén vacíos
- llama al método `login` del contexto de autenticación

## RegisterScreen

- permite crear una cuenta nueva
- valida que las contraseñas coincidan y tengan al menos 6 caracteres
- luego envía al flujo de selección de vehículo

## VehicleSelectionScreen

- muestra opciones para auto, moto y camioneta
- guarda la selección del usuario para filtrar parkings más adelante

## FavoritesScreen

- muestra los parkings guardados por el usuario
- permite abrir cada uno en Maps o quitarlo de favoritos

## UserConfigScreen

- muestra el correo del usuario
- permite cambiar la contraseña actual por una nueva
- permite cerrar sesión desde la interfaz
